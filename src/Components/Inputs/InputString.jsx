import { useContext } from "react";
import { AnswerContext } from "../../context/answerContext";
import { cleanString } from "../../utils/helperFunctions";

const InputString = ({ answer, placeholder = false, type, width = false }) => {
    const [inputString, setInputString] = useContext(AnswerContext);

    const handleChange = (e) => {
        if (inputString.locked.status) return;

        setInputString((prev) => {
            console.log(prev);
            console.log(e.target.value);
            console.log(answer);

            return {
                ...prev,
                value: e.target.value,
                status: answer
                    .map((answer) => cleanString(answer))
                    .includes(cleanString(e.target.value)),
            };
        });
    };

    const styles = {
        input: {
            boxSizing: "border-box",
            position: "absolute",
            left: "0",
            right: "0",
            width: width ? width : "220px",
            padding: "10px",
            borderRadius: "4px",
            margin: "16px auto",
            fontSize: " 1.25rem",
            border: "none",
            boxShadow:
                inputString.locked.correct == null
                    ? "1px 1px 6px rgba(0,0,0,.4)"
                    : inputString.locked.correct
                    ? "0px 0px 6px lime"
                    : "0px 0px 12px rgba(255,0,0,1)",
        },
    };

    return (
        <input
            type={type}
            style={styles.input}
            placeholder={placeholder}
            value={inputString.value}
            onChange={handleChange}
        />
    );
};

export default InputString;
