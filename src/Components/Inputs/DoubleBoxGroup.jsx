import { useContext } from "react";
import InputBox from "./InputBox";
import SelectInput from "./SelectInput";
import { AnswerContext } from "../../context/answerContext";
import { cleanValue } from "../../utils/helperFunctions";

const equalityValues = ["=", "<=", "<", ">", ">="];

const DoubleBoxGroup = ({ answer }) => {
    const [doubleInput, setDoubleInput] = useContext(AnswerContext);

    return (
        <>
            <span style={styles.leftBox}>
                <InputBox
                    value={doubleInput.firstInputFirstBox}
                    locked={doubleInput.locked}
                    sendValue={(e) => {
                        setDoubleInput((prev) => {
                            e = cleanValue(e);
                            return {
                                ...prev,
                                firstInputFirstBox: e,
                                status: answer.includes(
                                    `${e}${prev.firstInputMiddleBox}${prev.firstInputLastBox} and ${prev.secondInputFirstBox}${prev.secondInputMiddleBox}${prev.secondInputLastBox}`
                                ),
                            };
                        });
                    }}
                />
                <SelectInput
                    margin="0"
                    locked={doubleInput.locked}
                    value={doubleInput.firstInputMiddleBox}
                    values={equalityValues}
                    sendInput={(e) =>
                        setDoubleInput((prev) => {
                            return {
                                ...prev,
                                firstInputMiddleBox: e,
                                status: answer.includes(
                                    `${prev.firstInputFirstBox}${e}${prev.firstInputLastBox} and ${prev.secondInputFirstBox}${prev.secondInputMiddleBox}${prev.secondInputLastBox}`
                                ),
                            };
                        })
                    }
                />
                <InputBox
                    margin="0 0 0 48px"
                    value={doubleInput.firstInputLastBox}
                    locked={doubleInput.locked}
                    sendValue={(e) =>
                        setDoubleInput((prev) => {
                            e = cleanValue(e);
                            return {
                                ...prev,
                                firstInputLastBox: e,
                                status: answer.includes(
                                    `${prev.firstInputFirstBox}${prev.firstInputMiddleBox}${e} and ${prev.secondInputFirstBox}${prev.secondInputMiddleBox}${prev.secondInputLastBox}`
                                ),
                            };
                        })
                    }
                />
            </span>
            <span style={styles.rightBox}>
                <InputBox
                    value={doubleInput.secondInputFirstBox}
                    locked={doubleInput.locked}
                    sendValue={(e) =>
                        setDoubleInput((prev) => {
                            e = cleanValue(e);
                            return {
                                ...prev,
                                secondInputFirstBox: e,
                                status: answer.includes(
                                    `${prev.firstInputFirstBox}${prev.firstInputMiddleBox}${prev.firstInputLastBox} and ${e}${prev.secondInputMiddleBox}${prev.secondInputLastBox}`
                                ),
                            };
                        })
                    }
                />
                <SelectInput
                    margin="0"
                    value={doubleInput.secondInputMiddleBox}
                    locked={doubleInput.locked}
                    values={equalityValues}
                    sendInput={(e) =>
                        setDoubleInput((prev) => {
                            return {
                                ...prev,
                                secondInputMiddleBox: e,
                                status: answer.includes(
                                    `${prev.firstInputFirstBox}${prev.firstInputMiddleBox}${prev.firstInputLastBox} and ${prev.secondInputFirstBox}${e}${prev.secondInputLastBox}`
                                ),
                            };
                        })
                    }
                />
                <InputBox
                    margin="0 0 0 48px"
                    value={doubleInput.secondInputLastBox}
                    locked={doubleInput.locked}
                    sendValue={(e) =>
                        setDoubleInput((prev) => {
                            e = cleanValue(e);
                            return {
                                ...prev,
                                secondInputLastBox: e,
                                status: answer.includes(
                                    `${prev.firstInputFirstBox}${prev.firstInputMiddleBox}${prev.firstInputLastBox} and ${prev.secondInputFirstBox}${prev.secondInputMiddleBox}${e}`
                                ),
                            };
                        })
                    }
                />
            </span>
        </>
    );
};

const styles = {
    leftBox: { float: "left", marginLeft: "10%" },
    rightBox: { float: "right", marginRight: "10%" },
};

export default DoubleBoxGroup;
