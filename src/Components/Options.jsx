import { Fragment, useMemo } from "react";
import RadioCard from "./RadioCard";
import { shuffle } from "../utils/helperFunctions";

const Options = ({ array, clicked, handleSelection, usableDesc }) => {
    const options = useMemo(() => shuffle(array), [array]);

    return (
        <>
            {options.map((option, i) => {
                return (
                    <Fragment key={i}>
                        {!usableDesc.usable ? (
                            <RadioCard
                                message={option}
                                square
                                centerText
                                onClick={handleSelection}
                                clicked={option == clicked.clicked}
                            />
                        ) : (
                            option == clicked.clicked && (
                                <RadioCard
                                    message={option}
                                    square
                                    centerText
                                    onClick={handleSelection}
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
