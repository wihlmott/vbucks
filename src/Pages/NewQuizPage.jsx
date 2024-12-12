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
import InvalidFields from "../Components/NewQuiz/InvalidFields";
import { removeDuplicates } from "../utils/helperFunctions";

const NewQuizPage = () => {
    const [user, _] = useContext(UserContext);
    const userID = `${user[1]}${user[2]}`;
    const [loading, setLoading] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);

    const initialNewQuiz = {
        subject: { value: "-- -- -- --", valid: false },
        quiz_title: { value: "", valid: false },
        type_of_question: { value: "-- -- -- --", valid: false },
        question: { value: "", valid: false },
        answer: { value: [], valid: false },
        options: { value: [], valid: false },
        description: { value: "", valid: false },
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
            if (newQuiz.type_of_question.value != "multiple choice")
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

        setInvalidFields(() =>
            questions.filter((question) => {
                if (newQuiz[question.value].valid == false)
                    return question.value;
            })
        );
        if (invalidFields.length > 0) return;

        const payloadCreate = {
            question: newQuiz.question.value,
            options:
                newQuiz.options.value == []
                    ? []
                    : newQuiz.options.value?.split(","),
            description: newQuiz.description.value,
            answer: newQuiz.answer.value?.split(","),
            quiz_title: newQuiz.quiz_title.value,
            subject: newQuiz.subject.value,
            type: questions
                .filter((question) => question.value == "type_of_question")[0]
                .options.filter(
                    (option) => option.text == newQuiz.type_of_question.value
                )[0].element,
        };

        setLoading(true);
        try {
            await db.questions.create(payloadCreate);
            const response = (
                await db.subjects.list([
                    Query.equal("title", [newQuiz.subject.value]),
                ])
            ).documents[0];

            const payloadSubject = {
                title: response.title,
                quiz_titles: response.quiz_titles.includes(
                    newQuiz.quiz_title.value
                )
                    ? response.quiz_titles
                    : [...response.quiz_titles, newQuiz.quiz_title.value],
            };
            await db.subjects.update(newQuiz.subject.value, payloadSubject);
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
        <form onSubmit={submitHandler} style={{ textAlign: "center" }}>
            {existingQuizTitles.show && (
                <SearchedQuizTitles
                    titles={existingQuizTitles.values}
                    sendValue={(e) => {
                        setNewQuiz((prev) => {
                            return {
                                ...prev,
                                quiz_title: { value: e, valid: e.length > 0 },
                            };
                        });
                        setExistingQuizTitles((prev) => {
                            return { ...prev, show: false };
                        });
                    }}
                />
            )}
            {Object.values(questions).map((el) => render(el.type, el))}
            {invalidFields.length > 0 && (
                <InvalidFields array={invalidFields} />
            )}
            {loading && <Loading />}
            {confirm.status && (
                <ConfirmNotification
                    message={confirm.message}
                    status={confirm.status}
                />
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
