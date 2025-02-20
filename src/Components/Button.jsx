import { colors } from "../config";

const Button = ({
    text = "text",
    submitHandler = () => {},
    width = false,
    cancel = false,
    fontSize = false,
    margin = false,
    borderRadius = false,
}) => {
    const color = colors.gradients[0].split(" ")[1];

    const sendHandler = (e) => submitHandler(e);

    return (
        <button
            style={{
                boxSizing: "border-box",
                backgroundColor: cancel ? "transparent" : color,
                width: width ? width : "240px",
                display: "inline-block",
                padding: "16px",
                borderRadius: borderRadius ? borderRadius : "4px",
                margin: margin ? margin : "8px ",
                color: cancel ? "inherit" : "white",
                textAlign: "center",
                cursor: "pointer",
            }}
            type="submit"
            onClick={sendHandler}
        >
            <p style={{ margin: "0", fontSize: fontSize }}>{text}</p>
        </button>
    );
};

export default Button;
