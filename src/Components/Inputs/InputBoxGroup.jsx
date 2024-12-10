import { useContext, useState } from "react";
import InputBox from "./InputBox";
import SelectInput from "./SelectInput";
import { AnswerContext } from "../../context/answerContext";
import { cleanValue } from "../../utils/helperFunctions";

const InputBoxGroup = ({ answer }) => {
    const [input, setInput] = useContext(AnswerContext);

    return (
        <span
            style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
            }}
        >
            <InputBox
                locked={input.locked}
                value={input.firstBox}
                sendValue={(e) =>
                    setInput((prev) => {
                        e = cleanValue(e);
                        return {
                            ...prev,
                            firstBox: e,
                            status: answer.includes(
                                `${e}${prev.middleBox}${prev.lastBox}`
                            ),
                        };
                    })
                }
            />
            <SelectInput
                margin="0"
                values={["=", "<=", "<", ">", ">="]}
                value={input.middleBox}
                locked={input.locked}
                sendInput={(e) =>
                    setInput((prev) => {
                        return {
                            ...prev,
                            middleBox: e,
                            status: answer.includes(
                                `${prev.firstBox}${e}${prev.lastBox}`
                            ),
                        };
                    })
                }
            />
            <InputBox
                margin="0 0 0 46px"
                locked={input.locked}
                value={input.lastBox}
                sendValue={(e) =>
                    setInput((prev) => {
                        e = cleanValue(e);
                        return {
                            ...prev,
                            lastBox: e,
                            status: answer.includes(
                                `${prev.firstBox}${prev.middleBox}${e}`
                            ),
                        };
                    })
                }
            />
        </span>
    );
};

export default InputBoxGroup;
