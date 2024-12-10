import { usePersistedState } from "../hooks/usePersistedState";
import Button from "../Components/Button";
import TitledInput from "../Components/NewQuiz/TitledInput";
import { UserContext } from "../context/context";
import { useContext } from "react";
import TitledDropdown from "../Components/NewQuiz/TitledDropdown";

const inputs = [
    { value: "subject", type: "dropdown" },
    { value: "quiz_title", type: "input" },
];

const NewQuizPage = () => {
    const [user, _] = useContext(UserContext);
    const userID = `${user[1]}${user[2]}`;

    const initialNewQuiz = { subject: "", quiz_title: "" };
    const [newQuiz, setNewQuiz] = usePersistedState(
        { user: userID, topic: "new", value: "quiz" },
        initialNewQuiz
    );
    const submitHandler = (e) => {
        e.preventDefault();

        console.log(newQuiz);
    };

    return (
        <form onSubmit={submitHandler} style={{ textAlign: "center" }}>
            {inputs.map((el) => {
                return (
                    <>
                        {el.type == "input" && (
                            <TitledInput
                                key={el.value}
                                title={el.value}
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
                        )}
                        {el.type == "dropdown" && (
                            <TitledDropdown title={el.value} value={"="} />
                        )}
                    </>
                );
            })}

            <div
                style={{
                    position: "absolute",
                    width: "100vw",
                    bottom: "0",
                    marginBottom: "80px",
                    textAlign: "center",
                }}
            >
                <Button text="create new quiz" onSubmit={submitHandler} />
            </div>
        </form>
    );
};

export default NewQuizPage;
