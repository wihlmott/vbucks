import { colors } from "../config";
import Card from "./Card";

const RadioCard = ({
    height = "auto",
    backgroundColor = false,
    centerText = false,
    onClick = () => {},
    title = false,
    message = false,
    value = false,
    square = false,
    progressBar = false,
    clicked = false,
    shadowColor = colors.grey,
}) => {
    return (
        <>
            <Card
                height={height}
                backgroundColor={backgroundColor}
                centerText={centerText}
                onClick={onClick}
                title={title}
                message={message}
                value={value}
                square={square}
                icon={false}
                progressBar={progressBar}
                shadowColor={shadowColor}
            />
            <span
                style={{
                    position: "absolute",
                    right: "24px",
                    marginTop: "-55px",
                }}
            >
                <input type="radio" checked={clicked} onChange={() => {}} />
            </span>
        </>
    );
};

export default RadioCard;
