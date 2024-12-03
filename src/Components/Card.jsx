import { colors } from "../config";
import ProgressBar from "./ProgressBar.jsx";

const Card = ({
    height = "auto",
    backgroundColor = false,
    centerText = false,
    onClick = () => {},
    title = false,
    message = false,
    value = false,
    square = false,
    icon = false,
    shadowColor = colors.grey,
    progressBar = false,
    progressBarFull = false,
}) => {
    const styles = {
        card: {
            boxSizing: "border-box",
            boxShadow: `1px 1px 5px ${
                backgroundColor ? backgroundColor.split(" ")[1] : shadowColor
            }`,
            height: progressBar ? "90px" : height,
            borderRadius: `${square ? "0" : "15px"}`,
            padding: "8px",
            cursor: "pointer",
            margin: "13px 10px",
            width: "calc(100vw - 20px)",
            background: backgroundColor ? backgroundColor : "white",
        },
        title: {
            textTransform: "uppercase",
            paddingLeft: "5px",
            textShadow: colors.textShadowHeading,
            color: `${!backgroundColor ? "black" : "white"}`,
            display: "inline-block",
            marginBottom: "0",
            fontSize: message ? "0.9rem" : "1.1rem",
        },
        message: {
            color: `${!backgroundColor ? "black" : "white"}`,
            textShadow: colors.textShadowHeading,
            paddingLeft: "10px",
            fontSize: "0.9rem",
            textAlign: centerText ? "center" : "false",
        },
        icon: {
            boxSizing: "border-box",
            float: "left",
            color: "white",
            fontSize: "3rem",
            marginTop: "5px",
            height: "100%",
            width: "20%",
            rotate: "-5deg",
            paddingLeft: "5px",
            filter: "drop-shadow(3px 0px 15px rgba(0,0,0,0.55))",
        },
        cardInner: {
            paddingTop: "5px",
            float: "right",
            width: "80%",
        },
    };

    const XML = () => {
        return (
            <>
                {title && (
                    <>
                        <h3
                            style={{
                                ...styles.title,
                                fontSize: "2rem",
                                margin: "0 -5px 0 5px",
                            }}
                        >
                            {title[0]}
                        </h3>
                        <h3 style={styles.title}>{title.slice(1)}</h3>
                    </>
                )}
                <div style={{ width: "100%" }}>
                    {progressBar && (
                        <ProgressBar
                            value={progressBar}
                            full={progressBarFull}
                        />
                    )}
                </div>
                {message && <p style={styles.message}>{message}</p>}
            </>
        );
    };

    const clickHandler = () =>
        onClick({ title: title, value: value, message: message });

    if (!icon)
        return (
            <div style={styles.card} onClick={clickHandler}>
                {XML()}
            </div>
        );
    if (icon)
        return (
            <div style={styles.card} onClick={clickHandler}>
                {icon && <div style={styles.icon}>{icon}</div>}
                <div style={styles.cardInner}>{XML()}</div>
            </div>
        );
};

export default Card;
