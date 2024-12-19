import Button from "../Components/Button";
import TitledInput from "../Components/NewQuiz/TitledInput";
import TitledDropdown from "../Components/NewQuiz/TitledDropdown";
import Loading from "../Components/Loading";
import { usePersistedState } from "../hooks/usePersistedState";
import { UserContext } from "../context/context";
import { useContext, useEffect, useRef, useState } from "react";
import { newQuizQuestions } from "../config";
import { db } from "../database/databases";
import SearchedQuizTitles from "../Components/NewQuiz/SearchedQuizTitles";
import { Query } from "appwrite";
import ConfirmNotification from "../Components/ConfirmNotification";
import InvalidFields from "../Components/NewQuiz/InvalidFields";
import {
    initialNewQuiz,
    returnInvalidFields,
    returnPayloadCreateQuestion,
} from "../Components/NewQuiz/newQuizHelpers";

const NewQuizPage = () => {
    const [user, _] = useContext(UserContext);
    const userID = `${user[1]}${user[2]}`;
    const [loading, setLoading] = useState(false);

    const [invalidFields, setInvalidFields] = useState([]);
    const initialConfirm = { status: null, message: null };
    const [confirm, setConfirm] = useState(initialConfirm);
    const messageRef = useRef();

    const [newQuiz, setNewQuiz] = usePersistedState(
        { user: userID, topic: "new", value: "quiz" },
        initialNewQuiz
    );
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
            if (newQuiz.type_of_question.value != "multiple choice")
                return newQuizQuestions.filter(
                    (question) => question.value != "options"
                );
            return newQuizQuestions;
        });
    }, [newQuiz.type_of_question]);
    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [confirm, invalidFields]);

    const returnSearch = (e) =>
        setExistingQuizTitles({
            show: true,
            values: e,
        });

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        setInvalidFields(() => returnInvalidFields(newQuiz));

        try {
            const payloadCreateQuestion = returnPayloadCreateQuestion(
                newQuiz,
                questions
            );
            await db.quiz_titles.get(newQuiz.quizTitle.value); // does the topic exist -- maybe chance to list with query, then will return null instead of throw error
            await db.questions.create(payloadCreateQuestion); //add question

            setConfirm({ status: true, message: "question uploaded" });
            setLoading(false);
        } catch (error) {
            if (error.code == 404) {
                console.log(error.message);

                try {
                    const payload = {
                        title: newQuiz.quizTitle.value,
                        grades_to_view: newQuiz.grades_to_view.value.split(","),
                        subject: newQuiz.subject.value,
                    };

                    await db.quiz_titles.createWithID(
                        newQuiz.quizTitle.value,
                        payload
                    ); //create topic
                    await db.questions.create(payloadCreateQuestion); //add question

                    setConfirm({ status: true, message: "question uploaded" });
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    setConfirm({
                        status: false,
                        message: `could not add question -- ${error.message}`,
                    });
                    console.error(error);
                }
            } else {
                setLoading(false);
                setConfirm({
                    status: false,
                    message: `could not create topic -- ${error.message}`,
                });
                console.error(error);
            }
        }

        setTimeout(() => {
            setConfirm(initialConfirm);
            setNewQuiz((prev) => {
                return {
                    ...prev,
                    type_of_question: { value: "-- -- -- --", valid: false },
                    question: { value: "", valid: false },
                    answer: { value: "", valid: false },
                    options: { value: "", valid: false },
                    description: { value: "", valid: false },
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
                        value={newQuiz[`${el.value}`].value}
                        sendValue={(e) => {
                            setNewQuiz((prev) => {
                                return {
                                    ...prev,
                                    [`${el.value}`]: {
                                        value: e.value,
                                        valid: e.value.length > 0,
                                    },
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
                        value={newQuiz[`${el.value}`].value}
                        long
                        sendValue={(e) => {
                            setNewQuiz((prev) => {
                                return {
                                    ...prev,
                                    [`${el.value}`]: {
                                        value: e.value,
                                        valid: e.value.length > 0,
                                    },
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
                        value={newQuiz[`${el.value}`].value}
                        find
                        returnSearch={returnSearch}
                        sendValue={(e) =>
                            setNewQuiz((prev) => {
                                return {
                                    ...prev,
                                    [`${el.value}`]: {
                                        value: e.value,
                                        valid: e.value.length > 0,
                                    },
                                };
                            })
                        }
                    />
                );
            case "dropdown":
                return (
                    <TitledDropdown
                        key={el.value}
                        title={el.value}
                        value={el.options}
                        selectedValue={newQuiz[el.value].value}
                        userID={userID}
                        sendValue={(e) =>
                            setNewQuiz((prev) => {
                                return {
                                    ...prev,
                                    [`${el.value}`]: {
                                        value: e,
                                        valid: e.length > 0,
                                    },
                                };
                            })
                        }
                    />
                );
            default:
                break;
        }
    };

    return (
        <form
            onSubmit={submitHandler}
            style={{ textAlign: "center", height: "75vh", overflow: "scroll" }}
        >
            {existingQuizTitles.show && (
                <SearchedQuizTitles
                    titles={existingQuizTitles.values}
                    sendValue={(e) => {
                        setNewQuiz((prev) => {
                            return {
                                ...prev,
                                subject: {
                                    value: e.subject.title,
                                    valid: e.subject.title.length > 0,
                                },
                                quizTitle: {
                                    value: e.title,
                                    valid: e.title.length > 0,
                                },
                                grades_to_view: {
                                    value: e.grades_to_view.sort().join(),
                                    valid:
                                        e.grades_to_view.sort().join().length >
                                        0,
                                },
                            };
                        });
                        setExistingQuizTitles((prev) => {
                            return { ...prev, show: false };
                        });
                    }}
                />
            )}
            {Object.values(questions).map((el) => render(el.type, el))}
            <div ref={messageRef}>
                {invalidFields.length > 0 && (
                    <InvalidFields array={invalidFields} />
                )}
                {loading && <Loading />}
                {confirm.status != null && (
                    <ConfirmNotification
                        message={confirm.message}
                        status={confirm.status}
                    />
                )}
            </div>
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
