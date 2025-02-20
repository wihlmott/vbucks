import { MathJax } from "better-react-mathjax";
import { colors } from "../config";
import Header from "./Header";
import { formatMessage } from "../utils/helperFunctions";

const QuestionHeader = ({
    title = false,
    message = false,
    color = "white",
    heightFixed = false,
    messageSize = false,
    centerText = false,
    shadowColor = colors.grey,
    index = false,
    total = false,
    score = "0",
}) => {
    const styles = {
        text: {
            top: "0",
            bottom: "0",
            color: "white",
            margin: "auto",
            textShadow: colors.textShadowHeading,
            fontSize: ".8rem",
        },
        score: {
            marginTop: "-25px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "70px",
            height: "70px",
            boxShadow: `1px 1px 5px ${
                color ? color.split(" ")[1] : shadowColor
            }`,
            background: "rgba(255,255,255,0.15)",
            borderRadius: "50%",
            textAlign: "center",
            alignContent: "center",
        },
        messageBox: {
            boxSizing: "border-box",
            marginTop: "-20px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "5px",
            width: "88%",
            height: "135px",
            borderRadius: "25px",
            background: "white",
            alignContent: "center",
            textAlign: "center",
            overflow: "scroll",
        },
    };

    const messageToRender = formatMessage(message, "~");

    return (
        <>
            <Header
                color={color}
                heightFixed={heightFixed}
                messageSize={messageSize}
                centerText={centerText}
                shadowColor={shadowColor}
            >
                <span>
                    <h4 style={styles.text}>{`${index}/${total}`}</h4>
                </span>
                <div style={styles.score}>
                    <h4
                        style={{
                            ...styles.text,
                            fontSize: "1.4rem",
                        }}
                    >
                        {score}
                    </h4>
                </div>
                <div style={styles.messageBox}>
                    <MathJax inline dynamic>
                        <h1
                            style={{
                                ...styles.text,
                                color: "black",
                                fontSize: "1.2rem",
                            }}
                        >
                            {messageToRender}
                        </h1>
                    </MathJax>
                </div>
            </Header>
        </>
    );
};

export default QuestionHeader;
