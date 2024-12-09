import { useContext, useState } from "react";
import InputBox from "./InputBox";
import SelectInput from "./SelectInput";
import { AnswerContext } from "../../context/answerContext";

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
                sendValue={(e) =>
                    setInput((prev) => {
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
                sendValue={(e) =>
                    setInput((prev) => {
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
