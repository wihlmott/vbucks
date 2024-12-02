import { useState, useEffect } from "react";
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

const Question = () => {
    const { state } = useLocation();
    const { topic, color } = state;

    //if counter hsa become full, write to db. if value in db exists, don't let it be rewritten. this way, quiz can be redone, but new score won't be saved
    const [counter, setCounter] = usePersistedState(
        { topic: topic, value: "counter" },
        { value: 0, full: false }
    );
    const [quizScore, setQuizScore] = usePersistedState(
        { topic: topic, value: "quizScore" },
        0
    );

    const [clicked, setClicked] = useState({ clicked: "", status: "" });
    const [usableDesc, setUsableDesc] = useState({
        usable: false,
        open: false,
    });

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
        setCounter((prev) => {
            reset();

            if (prev.value == quiz.max) {
                //write to document
                return { value: quiz.max, full: true };
            }

            if (prev.value != quiz.max)
                return { value: prev.value + 1, full: false };
        });
        setQuizScore((prev) => (clicked.status ? prev + 10 : prev + 5));
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
        setCounter({ value: 0, full: false });
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
