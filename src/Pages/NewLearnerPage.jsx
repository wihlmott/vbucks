import { useContext, useState } from "react";
import Button from "../Components/Button";
import TitledInput from "../Components/NewQuiz/TitledInput";
import InvalidFields from "../Components/NewQuiz/InvalidFields";
import ConfirmNotification from "../Components/ConfirmNotification";
import Loading from "../Components/Loading";
import { newLearnerQuestions } from "../config";
import { UserContext } from "../context/context";
import { usePersistedState } from "../hooks/usePersistedState";
import { db } from "../database/databases";

// after validation
// use reducer for multiple state variables
// option for updating user, not only creating new user -- prevent user being created for same name user

const NewLearnerPage = () => {
    const [user, _] = useContext(UserContext);
    const userID = `${user[1]}${user[2]}`;
    const [invalidFields, setInvalidFields] = useState([]);
    const initialConfirm = { status: null, message: null };
    const [confirm, setConfirm] = useState(initialConfirm);
    const [loading, setLoading] = useState(false);

    const initialFormState = {
        learner_name: { value: null, valid: false },
        learner_password: { value: null, valid: false },
        confirm_password: { value: null, valid: false },
        subjects: { value: [], valid: false },
        class: { value: null, valid: false },
    };
    const [formState, setFormState] = usePersistedState(
        { user: userID, topic: "new", value: "learner" },
        initialFormState
    );

    const submitHandler = async (e) => {
        e.preventDefault();

        // setInvalidFields(
        //     newLearnerQuestions.filter((question) => {
        //         if (formState[question.value].valid == false)
        //             return question.value;
        //     })
        // );
        // if (
        //     formState.learner_password.value !==
        //     formState.confirm_password.value
        // )
        //     setInvalidFields((prev) => {
        //         return [...prev, "passwords do not match"];
        //     });
        // if (invalidFields.length > 0) return;

        const payload = {
            name: formState.learner_name.value.split(" ")[0],
            surname: formState.learner_name.value.split(" ")[1],
            subjects: formState.subjects.value.split(","),
            password: formState.learner_password.value,
            class: formState.class.value,
        };
        setLoading(true);
        try {
            await db.users.createWithID(
                formState.learner_name.value.replaceAll(" ", ""),
                payload
            );

            setLoading(false);
            setConfirm({ status: true, message: "learner added" });
            setFormState(initialFormState);

            setTimeout(() => {
                setConfirm(initialConfirm);
                setFormState(initialFormState);
            }, 4000);
        } catch (error) {
            setConfirm({
                status: false,
                message: `could not add learner -- ${error}`,
            });
            setLoading(false);
        }
    };

    const render = () =>
        newLearnerQuestions.map((question) => (
            <TitledInput
                key={question.value}
                title={question.value}
                type={question.password ? "password" : "text"}
                message={question.message ? question.message : null}
                value={formState[question.value]?.value}
                sendValue={(e) =>
                    setFormState((prev) => {
                        return {
                            ...prev,
                            [question.value]: {
                                value: e.value,
                                valid: e.value.length > 0,
                            },
                        };
                    })
                }
            />
        ));

    return (
        <form onSubmit={submitHandler} style={{ textAlign: "center" }}>
            {render()}
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

            <div style={styles.button} onClick={submitHandler}>
                <Button text="add new learner" />
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

export default NewLearnerPage;
