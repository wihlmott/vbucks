import { colors } from "../config";
import ProgressBar from "./ProgressBar.jsx";

const Card = ({
    height = "auto",
    width = false,
    radio = false,
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
            height: progressBar ? "76px" : height,
            borderRadius: `${square ? "0" : "15px"}`,
            padding: "8px",
            cursor: "pointer",
            margin: "10px auto",
            width: width ? width : "calc(100vw - 28px)",
            background: backgroundColor ? backgroundColor : "white",
        },
        title: {
            textTransform: "uppercase",
            paddingLeft: "5px",
            textShadow: colors.textShadowHeading,
            color: `${!backgroundColor ? "black" : "white"}`,
            display: "inline-block",
            marginBottom: "0",
            fontSize: message ? "0.9rem" : "1rem",
        },
        message: {
            color: `${!backgroundColor ? "black" : "white"}`,
            textShadow: colors.textShadowHeading,
            padding: "0 0 0 10px",
            fontSize: "1rem",
            textAlign: centerText ? "center" : "false",
            marginTop: radio ? "6px" : "inherit",
        },
        icon: {
            boxSizing: "border-box",
            float: "left",
            color: "white",
            fontSize: "2.6rem",
            marginTop: "6px",
            height: "100%",
            width: "20%",
            rotate: "-5deg",
            paddingLeft: "5px",
            filter: "drop-shadow(3px 0px 15px rgba(0,0,0,0.55))",
        },
        cardInner: {
            paddingTop: "4px",
            float: "right",
            width: "80%",
        },
    };

    const XML = () => {
        return (
            <>
                {title && (
                    <>
                        <h4
                            style={{
                                ...styles.title,
                                fontSize: "1.8rem",
                                margin: "0 -5px 0 5px",
                            }}
                        >
                            {title[0]}
                        </h4>
                        <h4 style={styles.title}>{title.slice(1)}</h4>
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
