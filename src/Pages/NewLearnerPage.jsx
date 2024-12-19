import { useContext, useEffect, useRef, useState } from "react";
import Button from "../Components/Button";
import TitledInput from "../Components/NewQuiz/TitledInput";
import InvalidFields from "../Components/NewQuiz/InvalidFields";
import ConfirmNotification from "../Components/ConfirmNotification";
import Loading from "../Components/Loading";
import { newLearnerQuestions } from "../config";
import { UserContext } from "../context/context";
import { usePersistedState } from "../hooks/usePersistedState";
import { db } from "../database/databases";
import {
    initialFormState,
    returnInvalidFieldsLearner,
    returnPayloadNewLearner,
} from "../Components/NewQuiz/newQuizHelpers";

// option for updating user, not only creating new user -- prevent user being created for same name user

const NewLearnerPage = () => {
    const [user, _] = useContext(UserContext);
    const userID = `${user[1]}${user[2]}`;
    const [invalidFields, setInvalidFields] = useState({
        values: null,
        open: false,
    });
    const initialConfirm = { status: null, message: null };
    const [confirm, setConfirm] = useState(initialConfirm);
    const confirmRef = useRef();
    const [loading, setLoading] = useState(false);

    const [formState, setFormState] = usePersistedState(
        { user: userID, topic: "new", value: "learner" },
        initialFormState
    );

    useEffect(() => {
        setInvalidFields((prev) => ({
            ...prev,
            values: returnInvalidFieldsLearner(formState),
        }));
    }, [formState]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (
            formState.learner_password.value != formState.confirm_password.value
        )
            setInvalidFields((prev) => ({
                ...prev,
                values: [...prev.values, "learner_password"],
            }));
        if (invalidFields.values.length > 0) {
            setInvalidFields((prev) => ({ ...prev, open: true }));
            confirmRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "end",
            });
            return;
        }
        setLoading(true);

        const payload = returnPayloadNewLearner(formState);
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
                message: `could not add learner -- ${error.message}`,
            });
            setLoading(false);
            console.error(error);
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
                    setFormState((prev) => ({
                        ...prev,
                        [question.value]: {
                            value: e.value,
                            valid: e.value.length > 0,
                        },
                    }))
                }
            />
        ));

    return (
        <form
            onSubmit={submitHandler}
            style={{ textAlign: "center", height: "75vh", overflowY: "scroll" }}
        >
            {render()}
            <div ref={confirmRef}>
                {invalidFields.open && (
                    <InvalidFields array={invalidFields.values} />
                )}
                {loading && <Loading />}
                {confirm.status && (
                    <ConfirmNotification
                        message={confirm.message}
                        status={confirm.status}
                    />
                )}
            </div>
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
