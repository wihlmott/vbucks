import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar";
import QuestionFooter from "../Components/QuestionFooter/QuestionFooter";
import CompleteModal from "../Components/CompleteModal";
import QuestionHeader from "../Components/QuestionHeader";
import Loading from "../Components/Loading";
import Options from "../Components/Options";
import { usePersistedState } from "../hooks/usePersistedState";
import { db } from "../database/databases";
import { Query } from "appwrite";
import { UserContext } from "../context/context";
import { AnswerContext } from "../context/answerContext";
import DoubleBoxGroup from "../Components/Inputs/DoubleBoxGroup";

const Question = () => {
    const { state } = useLocation();
    const { topic, color, subject } = state;
    const [user, setUser] = useContext(UserContext);

    if (!user) return;

    const [name, surname, regClass, a, quiz_completed, b] = user;
    const userID = (name + surname).toLowerCase();

    const [counter, setCounter] = usePersistedState(
        { user: userID, topic: topic, value: "counter" },
        { value: 0, max: 0, full: false }
    );
    const [quizScore, setQuizScore] = usePersistedState(
        { user: userID, topic: topic, value: "quizScore" },
        0
    );

    const [clicked, setClicked] = usePersistedState(
        { user: userID, topic: topic, value: "clicked" },
        { clicked: "", status: "" }
    );
    // const [input, setInput] = usePersistedState(
    //     { user: userID, topic: topic, value: "input" },
    //     { input: "", status: "" }
    // );
    const [doubleInput, setDoubleInput] = usePersistedState(
        { user: userID, topic: topic, value: "input" },
        {
            firstInputFirstBox: "",
            firstInputMiddleBox: "=",
            firstInputLastBox: "",
            secondInputFirstBox: "",
            secondInputMiddleBox: "=",
            secondInputLastBox: "",
            status: null,
            locked: false,
        }
    );

    const [usableDesc, setUsableDesc] = usePersistedState(
        { user: userID, topic: topic, value: "desc" },
        {
            usable: false,
            open: false,
        }
    );

    const [quiz, setQuiz] = useState({ quiz: [], max: 0, isLoading: true });
    const init = async () => {
        const response = await db.questions.list([
            Query.equal("quiz_title", [`${topic}`]),
        ]);
        setQuiz(() => {
            return {
                quiz: response.documents,
                max: response.total - 1,
                isLoading: false,
            };
        });
        setCounter((prev) => {
            return { ...prev, max: response.total - 1 };
        });
    };
    useEffect(() => {
        init();
    }, []);

    const handleSelection = (e) =>
        setClicked({
            clicked: e.message,
            status: quiz.quiz[counter.value]?.answer.includes(e.message),
        });
    // const handleInput = (e) => {};

    const handleNext = (e) => {
        if (e == "left") {
            reset();
            setCounter((prev) => {
                return {
                    ...prev,
                    value: prev.value == 0 ? 0 : prev.value - 1,
                    full: false,
                };
            });
            setQuizScore((prev) => (prev <= 0 ? prev : prev - 12));
        }
        if (e == "right") {
            if (clicked.clicked == "" && doubleInput.status == null) return;
            setUsableDesc({
                usable: true,
                open: false,
            });
            setDoubleInput((prev) => {
                return { ...prev, locked: true };
            });
            usableDesc.usable && nextQuestion();
        }
    };
    const nextQuestion = () => {
        //no visible expression of correct or incorrect on double input

        setQuizScore((prev) => {
            if (clicked && doubleInput.status == null)
                return clicked.status ? prev + 10 : prev + 5;
            if (doubleInput.status != null && clicked.clicked == "")
                return doubleInput.status ? prev + 10 : prev + 5;
        });
        setCounter((prev) => {
            reset();
            return prev.value == quiz.max
                ? { ...prev, value: quiz.max, full: true }
                : { ...prev, value: prev.value + 1, full: false };
        });
    };

    const addScoreToDB = async () => {
        if (quiz_completed.find((el) => el.split("-")[1] == topic)) return;

        try {
            const payload = {
                quiz_completed: [
                    ...quiz_completed,
                    `${subject}-${topic}-${quizScore}`,
                ],
            };
            await db.users.update(userID, payload);
            setUser(() => [
                name,
                surname,
                regClass,
                a,
                payload.quiz_completed,
                b,
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    const reset = () => {
        setClicked({ clicked: "", status: "" });
        setDoubleInput({
            firstInputFirstBox: "",
            firstInputMiddleBox: "=",
            firstInputLastBox: "",
            secondInputFirstBox: "",
            secondInputMiddleBox: "=",
            secondInputLastBox: "",
            status: null,
            locked: false,
        });
        // setInput({ input: "", status: "" });
        setUsableDesc({
            usable: false,
            open: false,
        });
    };
    const openDescHandler = () =>
        setUsableDesc({
            usable: true,
            open: true,
        });
    const navigator = useNavigate();
    const closeModal = () => {
        addScoreToDB();
        setCounter({ value: 0, max: 0, full: false });
        setQuizScore(0);
        navigator(-1);
    };

    const render = () => (
        <>
            <QuestionHeader
                color={color}
                centerText
                messageSize={"2rem"}
                message={quiz.quiz[counter.value]?.question}
                index={counter.value + 1}
                total={quiz.quiz.length}
                score={quizScore}
            />
            <ProgressBar
                value={{ max: quiz.quiz.length, done: counter.value }}
                full={counter.full}
            />
            {quiz.quiz[counter.value].type == "multiple_choice" && (
                <Options
                    array={quiz.quiz[counter.value].options}
                    clicked={clicked}
                    usableDesc={usableDesc}
                    handleSelection={handleSelection}
                />
            )}
            {quiz.quiz[counter.value].type == "input_doubleBoxes" && (
                <AnswerContext.Provider value={[doubleInput, setDoubleInput]}>
                    <DoubleBoxGroup answer={quiz.quiz[counter.value]?.answer} />
                </AnswerContext.Provider>

                //single box group
                // <InputBoxGroup sendAnswer={handleInput} />

                // string inputs
                // <Input
                //     type="text"
                //     placeholder="answer"
                //     widthMax
                //     sendValue={handleInput}
                //     value={input.input ? input.input : ""}
                //     status={input.status}
                // />
            )}
        </>
    );

    return (
        <>
            {quiz.isLoading ? <Loading /> : render()}
            <QuestionFooter
                leftUSE={counter.value != 0}
                rightUSE={clicked.clicked || doubleInput.status != null}
                sendClick={handleNext}
                usableDesc={usableDesc}
                description={quiz.quiz[counter.value]?.description}
                color={color}
                confirm={confirm}
                openDesc={openDescHandler}
            />
            {counter.full && (
                <CompleteModal
                    onClick={closeModal}
                    hidden={!counter.full}
                    score={quizScore}
                />
            )}
        </>
    );
};

export default Question;
