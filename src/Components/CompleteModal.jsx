import { MdOutlineStar } from "react-icons/md";
import { useEffect, useState } from "react";

const CompleteModal = ({
    subject = false,
    topic = false,
    total = false,
    totalCorrect = false,
    hidden = false,
    score = false,
    onClick = () => {},
}) => {
    const [scale, setScale] = useState("0");
    useEffect(() => {
        setScale("1");
    }, []);

    const borderRadius = "10px";
    const goldenrod = "218, 165, 32";

    const styles = {
        overlay: {
            display: hidden ? "none" : "inherit",
            position: "absolute",
            top: "0",
            zIndex: "5",
            height: "100vh",
            width: "100vw",
            background: "rgba(0,0,0,0.2)",
        },
        card: {
            position: "absolute",
            height: "60vh",
            width: "90vw",
            background: "white",
            borderRadius: borderRadius,
            boxShadow: `0 1px 30px 10px rgba(${goldenrod},0.4)`,
            margin: "40px auto",
            left: 0,
            right: 0,
            textAlign: "center",
            scale: scale,
            transitionProperty: "scale",
            transitionDuration: ".4s",
        },
        button: {
            position: "absolute",
            bottom: "0",
            width: "100%",
        },
        text: {
            margin: "0 30px",
            textShadow: "2px 1px 2px rgba(0,0,0,.3)",
        },
        star: {
            fontSize: "8rem",
            color: "goldenrod",
            marginTop: "50px",
            filter: "drop-shadow(0 3px 15px gold)",
        },
    };

    const clicked = (e) => {
        onClick(e);
    };

    return (
        <div style={styles.overlay} onClick={clicked}>
            <div style={styles.card}>
                <MdOutlineStar style={styles.star} />
                <h2 style={styles.text}>Congratulations!</h2>
                <h3 style={{ ...styles.text, marginBottom: "32px" }}>
                    You've completed the quiz.
                </h3>
                <h1
                    style={{
                        background: "rgba(218, 165, 32,0.9)",
                        width: "6rem",
                        height: "6rem",
                        margin: "auto",
                        alignContent: "center",
                        borderRadius: "50%",
                        filter: "drop-shadow(0 3px 10px gold)",
                        color: "whitesmoke",
                        textShadow: "2px 2px 15px rgba(0,0,0,.3)",
                    }}
                >
                    {score}
                </h1>
                <h4>points earned</h4>
            </div>
        </div>
    );
};

export default CompleteModal;
