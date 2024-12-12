import Button from "../Components/Button";
import TitledInput from "../Components/NewQuiz/TitledInput";
import TitledDropdown from "../Components/NewQuiz/TitledDropdown";
import Loading from "../Components/Loading";
import { usePersistedState } from "../hooks/usePersistedState";
import { UserContext } from "../context/context";
import { useContext, useEffect, useState } from "react";
import { newQuizQuestions } from "../config";
import { db } from "../database/databases";
import SearchedQuizTitles from "../Components/NewQuiz/SearchedQuizTitles";
import { Query } from "appwrite";
import ConfirmNotification from "../Components/ConfirmNotification";
import { removeDuplicates } from "../utils/helperFunctions";

const NewQuizPage = () => {
    const [user, _] = useContext(UserContext);
    const userID = `${user[1]}${user[2]}`;
    const [loading, setLoading] = useState(false);

    //assign valid state to each prop
    const initialNewQuiz = {
        subject: "-- -- -- --",
        quiz_title: "",
        type_of_question: "-- -- -- --",
        question: "",
        answer: [],
        options: [],
        description: "",
    };
    const [newQuiz, setNewQuiz] = usePersistedState(
        { user: userID, topic: "new", value: "quiz" },
        initialNewQuiz
    );
    const initialConfirm = { status: null, message: null };
    const [confirm, setConfirm] = useState(initialConfirm);
    const [questions, setQuestions] = usePersistedState(
        { user: userID, topic: "new", value: "questions" },
        newQuizQuestions
    );
    const [existingQuizTitles, setExistingQuizTitles] = useState({
        show: false,
        values: [],
    });

    useEffect(() => {
        setQuestions(() => {
            if (newQuiz.type_of_question != "multiple choice")
                return newQuizQuestions.filter(
                    (question) => question.value != "options"
                );
            return newQuizQuestions;
        });
    }, [newQuiz.type_of_question]);

    const returnSearch = (e) => {
        const amountPerTitle = removeDuplicates(e);
        setExistingQuizTitles({
            show: true,
            values: amountPerTitle,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // const formValid = ;
        // if (!formValid) return;

        const payloadCreate = {
            question: newQuiz.question,
            options: newQuiz.options == [] ? newQuiz.options.split(",") : [],
            description: newQuiz.description,
            answer: newQuiz.answer.split(","),
            quiz_title: newQuiz.quiz_title,
            subject: newQuiz.subject,
            type: questions
                .filter((question) => question.value == "type_of_question")[0]
                .options.filter(
                    (option) => option.text == newQuiz.type_of_question
                )[0].element,
        };

        setLoading(true);
        try {
            await db.questions.create(payloadCreate);
            const response = (
                await db.subjects.list([
                    Query.equal("title", [newQuiz.subject]),
                ])
            ).documents[0];
            console.log(response);

            const payloadSubject = {
                title: response.title,
                quiz_titles: response.quiz_titles.includes(newQuiz.quiz_title)
                    ? response.quiz_titles
                    : [...response.quiz_titles, newQuiz.quiz_title],
            };
            await db.subjects.update(newQuiz.subject, payloadSubject);
            setConfirm({ status: true, message: "question uploaded" });
            setLoading(false);
        } catch (error) {
            console.error(error);
            setConfirm({
                status: false,
                message: `could not upload -- ${error}`,
            });
            setLoading(false);
        }

        setTimeout(() => {
            setConfirm(initialConfirm);
            setNewQuiz((prev) => {
                return {
                    ...prev,
                    question: "",
                    answer: [],
                    options: [],
                    description: "",
                };
            });
        }, 4000);
    };

    const render = (type, el) => {
        switch (type) {
            case "input":
                return (
                    <TitledInput
                        key={el.value}
                        title={el.value}
                        message={el.message}
                        value={newQuiz[`${el.value}`]}
                        sendValue={(e) => {
                            setNewQuiz((prev) => {
                                return {
                                    ...prev,
                                    [`${el.value}`]: e.value,
                                };
                            });
                        }}
                    />
                );
            case "long_input":
                return (
                    <TitledInput
                        key={el.value}
                        title={el.value}
                        message={el.message}
                        value={newQuiz[`${el.value}`]}
                        long
                        sendValue={(e) => {
                            setNewQuiz((prev) => {
                                return {
                                    ...prev,
                                    [`${el.value}`]: e.value,
                                };
                            });
                        }}
                    />
                );
            case "find_input":
                return (
                    <TitledInput
                        key={el.value}
                        title={el.value}
                        message={el.message}
                        value={newQuiz[`${el.value}`]}
                        find
                        returnSearch={returnSearch}
                        sendValue={(e) => {
                            setNewQuiz((prev) => {
                                return {
                                    ...prev,
                                    [`${el.value}`]: e.value,
                                };
                            });
                        }}
                    />
                );
            case "dropdown":
                return (
                    <TitledDropdown
                        key={el.value}
                        title={el.value}
                        value={el.options}
                        userID={userID}
                        sendValue={(e) =>
                            setNewQuiz((prev) => {
                                return { ...prev, [`${el.value}`]: e };
                            })
                        }
                    />
                );
            default:
                break;
        }
    };

    return (
        <form onSubmit={submitHandler} style={{ textAlign: "center" }}>
            {existingQuizTitles.show && (
                <SearchedQuizTitles
                    titles={existingQuizTitles.values}
                    sendValue={(e) => {
                        setNewQuiz((prev) => {
                            return { ...prev, quiz_title: e };
                        });
                        setExistingQuizTitles((prev) => {
                            return { ...prev, show: false };
                        });
                    }}
                />
            )}
            {Object.values(questions).map((el) => render(el.type, el))}
            {loading && <Loading />}
            {confirm.status && (
                <ConfirmNotification message={confirm.message} />
            )}
            <div style={styles.button}>
                <Button text="upload question" onSubmit={submitHandler} />
            </div>
        </form>
    );
};

const styles = {
    button: {
        position: "absolute",
        width: "100vw",
        bottom: "0",
        marginBottom: "80px",
        textAlign: "center",
    },
};

export default NewQuizPage;
