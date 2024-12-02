import { useEffect, useState } from "react";
import { colors } from "../config";
const themeColor = {
    gradient: colors.gradients[0],
    color: colors.gradients[0].split(" ")[1],
};

const RewardsCardsSideshow = ({ rewards, points }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <>
            {rewards.map((reward, i) => {
                let styleObj = {};
                if (i == currentIndex)
                    styleObj = {
                        ...styles.card,
                        ...styles.focusedCard,
                        background:
                            points >= 100
                                ? "orange"
                                : `linear-gradient(0deg, orange 0%, white ${points}%)`,
                        transitionProperty: "background",
                        transitionDuration: "1s",
                    };
                if (i == currentIndex + 1)
                    styleObj = {
                        ...styles.card,
                        ...styles.rightCard,
                        ...styles.notFocusedCard,
                    };
                if (i == currentIndex - 1)
                    styleObj = {
                        ...styles.card,
                        ...styles.leftCard,
                        ...styles.notFocusedCard,
                    };

                return (
                    <div
                        key={i}
                        style={styleObj}
                        onClick={() => setCurrentIndex(i)}
                    >
                        {
                            <img
                                style={styles.cardImg}
                                src={reward.img}
                                alt={reward.id}
                            />
                        }
                    </div>
                );
            })}

            <div style={styles.dotsContainer}>
                {rewards.map((_, i) => (
                    <div
                        key={i}
                        style={
                            i != currentIndex
                                ? styles.dot
                                : { ...styles.dot, ...styles.selectedDot }
                        }
                        onClick={() => setCurrentIndex(i)}
                    ></div>
                ))}
            </div>
        </>
    );
};

const styles = {
    dotsContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        bottom: "0",
    },
    dot: {
        background: "rgba(255,255,255,0.5)",
        borderRadius: "50%",
        height: "8px",
        width: "8px",
        display: "inline-block",
        margin: "0 8px",
        cursor: "pointer",
    },
    selectedDot: {
        background: "rgba(255,255,255,1)",
    },

    notFocusedCard: {
        scale: "0.65",
        zIndex: "1",
    },
    focusedCard: {
        scale: "1",
        transform: "translateX(0)",
        background: `rgba(255,255,255,1)`,
        zIndex: "2",
    },

    leftCard: {
        transform: "translateX(-73%)",
    },
    rightCard: {
        transform: "translateX(73%)",
    },

    card: {
        alignContent: "center",
        position: "absolute",
        margin: "auto",
        height: "240px",
        width: "200px",
        display: "inline",
        borderRadius: "20px",
        boxShadow: `0 -5px 20px 2px ${themeColor.color}`,
        background: `rgba(255,255,255,${true ? "0.3" : "1"})`,
        cursor: "pointer",
        transitionProperty: "transform, scale, background",
        transitionDuration: "0.3s",
    },

    cardImg: {
        width: "140px",
        marginLeft: "30px",
        filter: `drop-shadow(0 30px 20px rgba(255,255,255,0.45))`,
    },
};

export default RewardsCardsSideshow;
