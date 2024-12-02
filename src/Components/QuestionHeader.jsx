import { useEffect, useState } from "react";
import { colors } from "../config";
import Header from "./Header";

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
        },
        score: {
            marginTop: "-25px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "100px",
            height: "100px",
            boxShadow: `1px 1px 5px ${
                color ? color.split(" ")[1] : shadowColor
            }`,
            background: "rgba(255,255,255,0.15)",
            borderRadius: "50%",
            textAlign: "center",
            alignContent: "center",
        },
    };

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
                            fontSize: "2rem",
                        }}
                    >
                        {score}
                    </h4>
                </div>
                <div
                    style={{
                        marginTop: "-20px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "90%",
                        height: "200px",
                        borderRadius: "25px",
                        background: "white",
                        alignContent: "center",
                        textAlign: "center",
                    }}
                >
                    <h1 style={{ ...styles.text, color: "black" }}>
                        {message}
                    </h1>
                </div>
            </Header>
        </>
    );
};

export default QuestionHeader;
