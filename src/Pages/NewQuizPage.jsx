import Button from "../Components/Button";
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
    returnInvalidFieldsQuiz,
    returnPayloadCreateQuestion,
} from "../Components/NewQuiz/newQuizHelpers";
import { render } from "../Components/NewQuiz/newQuizInputRender";
import { cleanDocID } from "../utils/helperFunctions";

const NewQuizPage = () => {
    const [user, _] = useContext(UserContext);
    const userID = `${user[1]}${user[2]}`;
    const [loading, setLoading] = useState(false);

    const [invalidFields, setInvalidFields] = useState({
        values: null,
        open: false,
    });
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
        setInvalidFields((prev) => ({
            ...prev,
            values: returnInvalidFieldsQuiz(newQuiz),
        }));
    }, [newQuiz]);

    const returnSearch = (e) =>
        setExistingQuizTitles({
            show: true,
            values: e,
        });

    const submitHandler = async (e) => {
        e.preventDefault();

        if (invalidFields.values != null) {
            setInvalidFields((prev) => ({ ...prev, open: true }));
            messageRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "end",
            });
            return;
        }
        setLoading(true);

        const payloadCreateQuestion = returnPayloadCreateQuestion(
            newQuiz,
            questions
        );
        try {
            await db.quiz_titles.get(cleanDocID(newQuiz.quizTitle.value)); // does the topic exist -- maybe chance to list with query, then will return null instead of throw error
            await db.questions.create(payloadCreateQuestion); //add question

            setConfirm({ status: true, message: "question uploaded" });
            setLoading(false);
        } catch (error) {
            if (error.code == 404) {
                try {
                    const payload = {
                        title: cleanDocID(newQuiz.quizTitle.value),
                        grades_to_view: newQuiz.grades_to_view.value.split(","),
                        subject: newQuiz.subject.value,
                    };
                    await db.quiz_titles.createWithID(
                        cleanDocID(newQuiz.quizTitle.value),
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
            setNewQuiz((prev) => ({
                ...prev,
                type_of_question: { value: "-- -- -- --", valid: false },
                question: { value: "", valid: false },
                answer: { value: "", valid: false },
                options: { value: "", valid: false },
                description: { value: "", valid: false },
            }));
        }, 4000);
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
                        setNewQuiz((prev) => ({
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
                                    e.grades_to_view.sort().join().length > 0,
                            },
                        }));
                        setExistingQuizTitles((prev) => ({
                            ...prev,
                            show: false,
                        }));
                    }}
                />
            )}
            {Object.values(questions).map((el) =>
                render(el.type, el, newQuiz, setNewQuiz, userID, returnSearch)
            )}
            <div ref={messageRef}>
                {invalidFields.open && (
                    <InvalidFields array={invalidFields.values} />
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
