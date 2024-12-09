import { useState } from "react";
import SelectButton from "./SelectButton";

const SelectInput = ({
    sendInput = () => {},
    margin = false,
    values,
    locked = false,
    value = false,
}) => {
    const [selectState, setSelectState] = useState({
        open: false,
        valueState: value ? value : "=",
    });

    const openList = () => {
        if (locked) return;

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
            width: "40px",
            height: "37px",
            padding: "0px",
            border: `1px solid rgba(0,0,0,0.4)`,
            borderRadius: "4px",
            margin: margin ? margin : "4px",
            marginTop: "4px",
            textAlign: "center",
            fontSize: "1.25rem",
            fontWeight: "bold",
            paddingTop: "1px",
            cursor: "pointer",
        },
    };

    return (
        <div style={styles.input} onClick={openList}>
            {selectState.valueState}

            {selectState.open && (
                <ul
                    style={{
                        listStyle: "none",
                        position: "relative",
                        marginLeft: "-45px",
                        marginTop: "10px",
                    }}
                >
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
