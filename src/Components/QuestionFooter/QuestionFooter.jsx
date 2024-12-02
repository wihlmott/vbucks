import DescriptionBtn from "./DescriptionBtn";
import Next from "./Next";

const QuestionFooter = ({
    usableDesc = false,
    description = false,
    sendClick = () => {},
    leftUSE = false,
    rightUSE = false,
    color = false,
    openDesc = false,
}) => {
    const openDescHandler = () => {
        openDesc();
    };

    return (
        <div style={{ position: "absolute", bottom: 0, width: "100vw" }}>
            {["left", "right"].map((e) => {
                return (
                    <div key={e} onClick={() => sendClick(e)}>
                        <Next
                            color={color}
                            leftUSE={leftUSE}
                            rightUSE={rightUSE}
                            arrowDirection={e}
                            usableDesc={usableDesc}
                        />
                    </div>
                );
            })}
            <DescriptionBtn
                usable={usableDesc}
                description={description}
                color={color}
                openDesc={openDescHandler}
            />
        </div>
    );
};

export default QuestionFooter;
