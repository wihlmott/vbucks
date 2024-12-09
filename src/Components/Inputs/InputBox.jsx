import { useState } from "react";

const InputBox = ({
    sendValue = () => {},
    margin = false,
    value = false,
    locked = { status: false, correct: null },
}) => {
    const [valueState, setValueState] = useState(value);

    let shadow = "1px 1px 6px rgba(0,0,0,.25)";
    if (locked.correct == true) shadow = "0px 0px 6px lime";
    if (locked.correct == false) shadow = "0px 0px 12px rgba(255,0,0,1)";

    const handleChange = (e) => {
        if (locked.status) return;

        setValueState(e.target.value);
        sendValue(e.target.value);
    };

    const styles = {
        input: {
            boxSizing: "border-box",
            width: "44px",
            height: "43px",
            padding: "10px",
            border: `1px solid rgba(0,0,0,0.4)`,
            borderRadius: "4px",
            margin: margin ? margin : "4px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.55rem",
            boxShadow: shadow,
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
