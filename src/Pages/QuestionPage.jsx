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
import { getFormattedDate } from "../utils/helperFunctions";

const QuestionPage = () => {
    const { state } = useLocation();
    const { topic, color, subject } = state;
    const [user, setUser] = useContext(UserContext);

    const navigator = useNavigate();
    useEffect(() => {
        if (!user) {
            navigator("/login");
        }
    }, [user]);
    if (!user) return;

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

    const clickedInit = {
        clicked: "",
        status: null,
        locked: { status: false, correct: null },
    };
    const [clicked, setClicked] = usePersistedState(
        { user: userID, topic: topic, value: "clicked" },
        clickedInit
    );
    const inputInit = {
        firstBox: "",
        middleBox: "=",
        lastBox: "",
        status: null,
        locked: { status: false, correct: null },
    };
    const [input, setInput] = usePersistedState(
        { user: userID, topic: topic, value: "input" },
        inputInit
    );
    const doubleInputInit = {
        firstInputFirstBox: "",
        firstInputMiddleBox: "=",
        firstInputLastBox: "",
        secondInputFirstBox: "",
        secondInputMiddleBox: "=",
        secondInputLastBox: "",
        status: null,
        locked: { status: false, correct: null },
    };
    const [doubleInput, setDoubleInput] = usePersistedState(
        { user: userID, topic: topic, value: "doubleInput" },
        doubleInputInit
    );
    const inputStringInit = {
        value: "",
        status: null,
        locked: { status: false, correct: null },
    };
    const [inputString, setInputString] = usePersistedState(
        { user: userID, topic: topic, value: "inputString" },
        inputStringInit
    );
    const usableDescInit = {
        usable: false,
        open: false,
    };
    const [usableDesc, setUsableDesc] = usePersistedState(
        { user: userID, topic: topic, value: "desc" },
        usableDescInit
    );

    const quiz_types = [
        { type: "multiple_choice", value: clicked, setter: setClicked },
        {
            type: "input_doubleBoxes",
            value: doubleInput,
            setter: setDoubleInput,
        },
        { type: "input_singleBoxes", value: input, setter: setInput },
        { type: "input_string", value: inputString, setter: setInputString },
    ];
    const [quiz, setQuiz] = useState({ quiz: [], max: 0, isLoading: true });
    const init = async () => {
        try {
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
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        init();
    }, []);

    const lockAnswer = (object, method) =>
        object.status != null &&
        method((prev) => {
            return {
                ...prev,
                locked: { status: true, correct: prev.status },
            };
        });

    const previouslyDoneQuiz = quiz_completed.find(
        (el) => el.split("-")[1] == topic
    );
    const pointsToAdd = previouslyDoneQuiz ? 2 : 3;

    const currentQuestion = quiz_types.filter(
        (el) => quiz.quiz[counter.value]?.type == el.type
    )[0];

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
            setQuizScore((prev) => (prev <= 0 ? prev : prev - pointsToAdd));
        }
        if (e == "right") {
            if (currentQuestion.value.status == null) return;

            setUsableDesc({
                usable: true,
                open: false,
            });
            lockAnswer(currentQuestion.value, currentQuestion.setter);
            usableDesc.usable && nextQuestion();
        }
    };
    const nextQuestion = () => {
        setQuizScore((prev) =>
            currentQuestion.value.status ? prev + pointsToAdd : prev
        );
        setCounter((prev) => {
            reset();
            return prev.value == quiz.max
                ? { ...prev, value: quiz.max, full: true }
                : { ...prev, value: prev.value + 1, full: false };
        });
    };

    const addScoreToDB = async () => {
        let payload, payloadAlt;
        const sendToAlt = previouslyDoneQuiz?.split("-")[2] >= quizScore;
        if (!sendToAlt) {
            payloadAlt = {
                alt_quiz_attempts: previouslyDoneQuiz
                    ? [...alt_quiz_attempts, previouslyDoneQuiz]
                    : alt_quiz_attempts,
            };
            payload = {
                quiz_completed: [
                    ...quiz_completed.filter((el) => el != previouslyDoneQuiz),
                    `${subject}-${topic}-${quizScore}-${getFormattedDate()}`,
                ],
            };
        }
        if (sendToAlt)
            payloadAlt = {
                alt_quiz_attempts: [
                    ...alt_quiz_attempts,
                    `${subject}-${topic}-${quizScore}-${getFormattedDate()}`,
                ],
            };

        try {
            !sendToAlt && (await db.users.update(userID, payload));
            previouslyDoneQuiz && (await db.users.update(userID, payloadAlt));

            setUser(() => [
                name,
                surname,
                regClass,
                a,
                sendToAlt ? quiz_completed : payload.quiz_completed,
                b,
                payloadAlt.alt_quiz_attempts,
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    const reset = () => {
        setClicked(clickedInit);
        setInput(inputInit);
        setDoubleInput(doubleInputInit);
        setInputString(inputStringInit);
        setUsableDesc(usableDescInit);
    };

    const openDescHandler = () =>
        setUsableDesc({
            usable: true,
            open: true,
        });
    const closeModal = () => {
        addScoreToDB();
        setCounter({ value: 0, max: 0, full: false });
        setQuizScore(0);
        navigator(-1);
    };

    const question = (type) => {
        switch (type) {
            case "multiple_choice":
                return (
                    <AnswerContext.Provider value={[clicked, setClicked]}>
                        <Options
                            array={quiz.quiz[counter.value].options}
                            answer={quiz.quiz[counter.value]?.answer}
                            usableDesc={usableDesc}
                        />
                    </AnswerContext.Provider>
                );
            case "input_doubleBoxes":
                return (
                    <AnswerContext.Provider
                        value={[doubleInput, setDoubleInput]}
                    >
                        <DoubleBoxGroup
                            answer={quiz.quiz[counter.value]?.answer}
                        />
                    </AnswerContext.Provider>
                );
            case "input_singleBoxes":
                return (
                    <AnswerContext.Provider value={[input, setInput]}>
                        <InputBoxGroup
                            answer={quiz.quiz[counter.value]?.answer}
                        />
                    </AnswerContext.Provider>
                );

            case "input_string":
                return (
                    <AnswerContext.Provider
                        value={[inputString, setInputString]}
                    >
                        <InputString
                            answer={quiz.quiz[counter.value]?.answer}
                            type="text"
                            placeholder="answer"
                            width="200px"
                        />
                    </AnswerContext.Provider>
                );

            default:
                break;
        }
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
            {question(quiz.quiz[counter.value].type)}
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

export default QuestionPage;
