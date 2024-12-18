import { Fragment, useContext, useMemo } from "react";
import RadioCard from "./RadioCard";
import { cleanValue, shuffle } from "../utils/helperFunctions";
import { AnswerContext } from "../context/answerContext";

const Options = ({ array, answer }) => {
    const answerClean = answer.map((el) => cleanValue(el));

    const [clicked, setClicked] = useContext(AnswerContext);
    const options = useMemo(() => shuffle(array), [array]);

    return (
        <>
            {options.map((option, i) => {
                return (
                    <Fragment key={i}>
                        {!clicked.locked.status ? (
                            <RadioCard
                                message={option}
                                square
                                centerText
                                onClick={(e) =>
                                    setClicked((prev) => {
                                        return {
                                            ...prev,
                                            clicked: e.message,
                                            status: answerClean.includes(
                                                cleanValue(e.message)
                                            ),
                                        };
                                    })
                                }
                                clicked={option == clicked.clicked}
                            />
                        ) : (
                            option == clicked.clicked && (
                                <RadioCard
                                    message={option}
                                    square
                                    centerText
                                    clicked={option == clicked.clicked}
                                    shadowColor={
                                        clicked.status ? "lime" : "#B00020"
                                    }
                                />
                            )
                        )}
                    </Fragment>
                );
            })}
        </>
    );
};

export default Options;
