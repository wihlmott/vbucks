import { useState } from "react";
import SelectButton from "./SelectButton";

const SelectInput = ({
    sendInput = () => {},
    margin = false,
    values,
    locked = { status: false, correct: null },
    value = false,
}) => {
    const [selectState, setSelectState] = useState({
        open: false,
        valueState: value ? value : "=",
    });
    let shadow = "1px 1px 6px rgba(0,0,0,.25)";
    if (locked.correct == true) shadow = "0px 0px 6px lime";
    if (locked.correct == false) shadow = "0px 0px 12px rgba(255,0,0,1)";

    const openList = () => {
        if (locked.status) return;

        setSelectState((prev) => {
            return { ...prev, open: !prev.open };
        });
    };
    const sendValue = (e) => {
        setSelectState((prev) => {
            return { ...prev, valueState: e };
        });
        sendInput(e);
    };

    const styles = {
        input: {
            position: "absolute",
            boxSizing: "border-box",
            display: "inline",
            width: "43px",
            height: "43px",
            border: `1px solid rgba(0,0,0,0.4)`,
            borderRadius: "4px",
            margin: margin ? margin : "4px",
            marginTop: "4px",
            textAlign: "center",
            fontSize: "1.25rem",
            fontWeight: "bold",
            paddingTop: "4px",
            cursor: "pointer",
            boxShadow: shadow,
        },
        list: {
            listStyle: "none",
            position: "relative",
            margin: "13px 0px 0px -45px",
        },
    };

    return (
        <div style={styles.input} onClick={openList}>
            {selectState.valueState}

            {selectState.open && (
                <ul style={styles.list}>
                    {values.map((value) => (
                        <SelectButton
                            key={value}
                            value={value}
                            sendValue={sendValue}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectInput;
