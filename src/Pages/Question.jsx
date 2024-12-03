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

const Question = () => {
    const { state } = useLocation();
    const { topic, color } = state;
    const [user, setUser] = useContext(UserContext);

    if (!user) return;

    const [name, surname, regClass, subject_points, quiz_completed] = user;
    const userID = name.toLowerCase() + surname.toLowerCase();

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
            if (clicked.clicked == "") return;
            setUsableDesc({
                usable: true,
                open: false,
            });
            usableDesc.usable && nextQuestion();
        }
    };
    const nextQuestion = () => {
        setQuizScore((prev) => (clicked.status ? prev + 10 : prev + 5));
        setCounter((prev) => {
            reset();
            return prev.value == quiz.max
                ? { ...prev, value: quiz.max, full: true }
                : { ...prev, value: prev.value + 1, full: false };
        });
    };

    const addScoreToDB = async () => {
        if (quiz_completed.find((el) => el.split("-")[0] == topic)) return;

        try {
            const payload = {
                quiz_completed: [...quiz_completed, `${topic}-${quizScore}`],
            };
            await db.users.update(userID, payload);
            setUser(() => [
                name,
                surname,
                regClass,
                subject_points,
                payload.quiz_completed,
            ]);
            setCounter({ value: 0, max: 0, full: false });
            setQuizScore(0);
        } catch (error) {
            console.error(error);
        }
    };

    const reset = () => {
        setClicked({ clicked: "", status: "" });
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
        navigator(-1);
    };

    const render = () => {
        return quiz.isLoading ? (
            <Loading />
        ) : (
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
                {
                    <Options
                        array={quiz.quiz[counter.value].options}
                        clicked={clicked}
                        usableDesc={usableDesc}
                        handleSelection={handleSelection}
                    />
                }
            </>
        );
    };

    return (
        <>
            {render()}
            <QuestionFooter
                leftUSE={counter.value != 0}
                rightUSE={clicked.clicked}
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
