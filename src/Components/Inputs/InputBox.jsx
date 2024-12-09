import { useState } from "react";

const InputBox = ({
    sendValue = () => {},
    margin = false,
    value = false,
    locked = false,
}) => {
    const [valueState, setValueState] = useState(value);
    const handleChange = (e) => {
        if (locked) return;

        setValueState(e.target.value);
        sendValue(e.target.value);
    };

    const styles = {
        input: {
            boxSizing: "border-box",
            width: "40px",
            padding: "10px",
            border: `1px solid rgba(0,0,0,0.4)`,
            borderRadius: "4px",
            margin: margin ? margin : "4px",
        },
    };

    return (
        <input
            type="text"
            style={styles.input}
            onChange={handleChange}
            value={valueState ? valueState : ""}
        />
    );
};

export default InputBox;
