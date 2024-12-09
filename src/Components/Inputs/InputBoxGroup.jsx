//not used anywhere

import { useState } from "react";
import InputBox from "./InputBox";
import SelectInput from "./SelectInput";

const InputBoxGroup = ({ sendAnswer }) => {
    const [answer, setAnswer] = useState({ first: "", middle: "=", last: "" });

    const handleAnswer = (e) => {
        switch (e.place) {
            case "first":
                setAnswer((prev) => {
                    return { ...prev, first: e.value };
                });
                break;
            case "middle":
                setAnswer((prev) => {
                    return { ...prev, middle: e.value };
                });
                break;
            case "last":
                setAnswer((prev) => {
                    return { ...prev, last: e.value };
                });
                break;
        }

        sendAnswer(answer);
    };

    return (
        <>
            <InputBox
                sendValue={(e) => handleAnswer({ place: "first", value: e })}
            />
            <SelectInput
                margin="0"
                values={["=", "<=", "<", ">", ">="]}
                sendInput={(e) => handleAnswer({ place: "middle", value: e })}
            />
            <InputBox
                margin="0 0 0 44px"
                sendValue={(e) => handleAnswer({ place: "last", value: e })}
            />
        </>
    );
};

export default InputBoxGroup;
