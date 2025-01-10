import { colors } from "../config";
import Card from "./Card";

const RadioCard = ({
    height = "auto",
    backgroundColor = false,
    width = "auto",
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
                radio={true}
                height={height}
                width={width}
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
                    right: "50px",
                    marginTop: "-46px",
                }}
            >
                {/* <input type="radio" checked={clicked} /> */}
                <div
                    style={{
                        marginTop: "2px",
                        border: "1px solid black",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: clicked ? "grey" : "",
                    }}
                    onClick={() =>
                        onClick({
                            title: title,
                            value: value,
                            message: message,
                        })
                    }
                />
            </span>
        </>
    );
};

export default RadioCard;
