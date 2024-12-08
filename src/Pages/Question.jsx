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
import InputBoxGroup from "../Components/Inputs/InputBoxGroup";
import InputString from "../Components/Inputs/InputString";

const Question = () => {
    const { state } = useLocation();
    const { topic, color, subject } = state;
    const [user, setUser] = useContext(UserContext);

    if (!user) return; //nav to login
    const [name, surname, regClass, a, quiz_completed, b, alt_quiz_attempts] =
        user;
    const userID = (name + surname).toLowerCase();

    const [counter, setCounter] = usePersistedState(
        { user: userID, topic: topic, value: "counter" },
        { value: 0, max: 0, full: false }
    );
    const [quizScore, setQuizScore] = usePersistedState(
        { user: userID, topic: topic, value: "quizScore" },
        0
    );
    const pointsToAdd = quiz_completed.find((el) => el.split("-")[1] == topic)
        ? 2
        : 3;

    const [clicked, setClicked] = usePersistedState(
        { user: userID, topic: topic, value: "clicked" },
        { clicked: "", status: null }
    );
    const [input, setInput] = usePersistedState(
        { user: userID, topic: topic, value: "input" },
        {
            firstBox: "",
            middleBox: "=",
            lastBox: "",
            status: null,
            locked: { status: false, correct: null },
        }
    );
    const [doubleInput, setDoubleInput] = usePersistedState(
        { user: userID, topic: topic, value: "doubleInput" },
        {
            firstInputFirstBox: "",
            firstInputMiddleBox: "=",
            firstInputLastBox: "",
            secondInputFirstBox: "",
            secondInputMiddleBox: "=",
            secondInputLastBox: "",
            status: null,
            locked: { status: false, correct: null },
        }
    );
    const [inputString, setInputString] = usePersistedState(
        { user: userID, topic: topic, value: "inputString" },
        {
            value: "",
            status: null,
            locked: { status: false, correct: null },
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
            if (
                clicked.status == null &&
                input.status == null &&
                doubleInput.status == null &&
                inputString.status == null
            )
                return;

            setUsableDesc({
                usable: true,
                open: false,
            });

            input.status != null &&
                setInput((prev) => {
                    console.log(prev);

                    return {
                        ...prev,
                        locked: { status: true, correct: prev.status },
                    };
                });
            doubleInput.status != null &&
                setDoubleInput((prev) => {
                    return {
                        ...prev,
                        locked: { status: true, correct: prev.status },
                    };
                });
            inputString.status != null &&
                setInputString((prev) => {
                    return {
                        ...prev,
                        locked: { status: true, correct: prev.status },
                    };
                });
            usableDesc.usable && nextQuestion();
        }
    };
    const nextQuestion = () => {
        setQuizScore((prev) => {
            if (
                clicked.status != null &&
                input.status == null &&
                doubleInput.status == null &&
                inputString.status == null
            )
                return clicked.status ? prev + pointsToAdd : prev;

            if (
                input.status != null &&
                clicked.status == null &&
                doubleInput.status == null &&
                inputString.status == null
            )
                return input.status ? prev + pointsToAdd : prev;
            if (
                doubleInput.status != null &&
                clicked.status == null &&
                input.status == null &&
                inputString.status == null
            )
                return doubleInput.status ? prev + pointsToAdd : prev;
            if (
                inputString.status != null &&
                doubleInput.status == null &&
                clicked.status == null &&
                input.status == null
            )
                return inputString.status ? prev + pointsToAdd : prev;
        });
        setCounter((prev) => {
            reset();
            return prev.value == quiz.max
                ? { ...prev, value: quiz.max, full: true }
                : { ...prev, value: prev.value + 1, full: false };
        });
    };

    const addScoreToDB = async () => {
        //take all quiz_completed
        /*check if quiz has already been done, 
        if true: check which score is greater, add greater score to quiz_completed, add lower score to alt_quiz_attempt*/

        //save quiz completed, remove element, add new element, element that was removed add to other array

        if (
            quiz_completed
                .find((el) => el.split("-")[1] == topic)
                .split("-")[2] >= quizScore
        )
            return;

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
                alt_quiz_attempts,
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    const reset = () => {
        setClicked({ clicked: "", status: null });
        setInput({
            firstBox: "",
            middleBox: "=",
            lastBox: "",
            status: null,
            locked: { status: false, correct: null },
        });
        setDoubleInput({
            firstInputFirstBox: "",
            firstInputMiddleBox: "=",
            firstInputLastBox: "",
            secondInputFirstBox: "",
            secondInputMiddleBox: "=",
            secondInputLastBox: "",
            status: null,
            locked: { status: false, correct: null },
        });
        setInputString({
            value: "",
            status: null,
            locked: { status: false, correct: null },
        });
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
            )}
            {quiz.quiz[counter.value].type == "input_singleBoxes" && (
                <AnswerContext.Provider value={[input, setInput]}>
                    <InputBoxGroup answer={quiz.quiz[counter.value]?.answer} />
                </AnswerContext.Provider>
            )}
            {quiz.quiz[counter.value].type == "input_string" && (
                <AnswerContext.Provider value={[inputString, setInputString]}>
                    <InputString
                        answer={quiz.quiz[counter.value]?.answer}
                        type="text"
                        placeholder="answer"
                        width="200px"
                    />
                </AnswerContext.Provider>
            )}
        </>
    );

    return (
        <>
            {quiz.isLoading ? <Loading /> : render()}
            <QuestionFooter
                leftUSE={counter.value != 0}
                rightUSE={
                    clicked.status != null ||
                    input.status != null ||
                    doubleInput.status != null ||
                    inputString.status != null
                }
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
