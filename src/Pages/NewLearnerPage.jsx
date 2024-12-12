import { useContext } from "react";
import Button from "../Components/Button";
import TitledInput from "../Components/NewQuiz/TitledInput";
import { newLearnerQuestions } from "../config";
import { UserContext } from "../context/context";
import { usePersistedState } from "../hooks/usePersistedState";

const NewLearnerPage = () => {
    const [user, _] = useContext(UserContext);
    const userID = `${user[1]}${user[2]}`;

    const initialFormState = {
        name: null,
        password: null,
        confirmPassword: null,
        subjects: [],
        class: null,
    };
    const [formState, setFormState] = usePersistedState(
        { user: userID, topic: "new", value: "learner" },
        initialFormState
    );

    const submitHandler = () => {
        setFormState(initialFormState);
        console.log(`submit`);
    };

    const render = () =>
        newLearnerQuestions.map((question) => (
            <TitledInput
                key={question.value}
                title={question.value}
                type={question.password ? "password" : "text"}
                message={question.message ? question.message : null}
                value={formState[question.value]}
                sendValue={(e) =>
                    setFormState((prev) => {
                        return { ...prev, [question.value]: e.value };
                    })
                }
            />
        ));

    return (
        <form onSubmit={submitHandler} style={{ textAlign: "center" }}>
            {render()}

            <div style={styles.button}>
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
