import { useContext, useState } from "react";
import { colors } from "../config";
import { db } from "../database/databases";
import { UserContext } from "../context/context";
import GlossyButton from "./GlossyButton";

const themeColor = {
    gradient: colors.gradients[0],
    color: colors.gradients[0].split(" ")[1],
};

const RewardsCardsSideshow = ({ rewards, points, subject }) => {
    const [user, setUser] = useContext(UserContext);

    const [name, surname, a, b, c, rewards_used] = user;
    const userID = (name + surname).toLowerCase();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState();
    const [scale, setScale] = useState(false);

    const updateUsedCards = (reward) => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        try {
            const payload = {
                rewards_used: [
                    ...rewards_used,
                    `${subject}-${reward.id}-${day}${month}${year}`,
                ],
            };
            db.users.update(userID, payload);
            setUser(() => [name, surname, a, b, c, payload.rewards_used]);
        } catch (error) {
            console.error(error);
        }
    };

    const styles = {
        overlay: {
            position: "fixed",
            top: "0",
            zIndex: "2",
            height: "100vh",
            width: "100vw",
            background: "rgba(0,0,0,0.2)",
        },
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
            position: "absolute",
            margin: "auto",
            height: scale ? "260px" : "240px",
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
            position: "absolute",
            top: "0",
            bottom: "0",
            margin: "auto",
            width: "125px",
            marginLeft: "30px",
            filter: `drop-shadow(0 30px 20px rgba(255,255,255,0.45))`,
        },
    };

    return (
        <>
            {scale && (
                <div
                    style={styles.overlay}
                    onClick={() => {
                        setScale(false);
                        setError("");
                    }}
                />
            )}
            {rewards.map((reward, i) => {
                let styleObj = {};
                if (i == currentIndex)
                    styleObj = {
                        ...styles.card,
                        ...styles.focusedCard,
                        scale: scale ? "1.75" : "1",
                        transform: `translateY(${scale ? "30%" : "0"})`,
                        background:
                            points >= 100
                                ? "orange"
                                : `linear-gradient(0deg, orange 0%, white ${points}%)`,
                        transitionProperty: "background, scale, transform",
                        transitionDuration: ".5s",
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
                        onClick={() => {
                            if (i == currentIndex) setScale(true);
                            setCurrentIndex(i);
                        }}
                    >
                        {
                            <img
                                style={styles.cardImg}
                                src={reward.img}
                                alt={reward.id}
                            />
                        }
                        <div
                            style={{
                                position: "absolute",
                                width: "100%",
                                scale: ".60",
                                textAlign: "center",
                                bottom: "0",
                            }}
                        >
                            {scale && i == currentIndex && (
                                <>
                                    <h2
                                        style={{
                                            textAlign: "center",
                                            position: "absolute",
                                            margin: "0",
                                            bottom: "340px",
                                            textShadow:
                                                "1px 1px 4px rgba(0,0,0,.3)",
                                        }}
                                    >
                                        {reward.id}
                                    </h2>
                                    <GlossyButton
                                        text="use"
                                        width="60%"
                                        fontSize="1.3rem"
                                        borderRadius="12px"
                                        bottom="0"
                                        margin="0"
                                        submitHandler={() => {
                                            if (points <= 100)
                                                setError(
                                                    `need 100 points to use`
                                                );
                                            updateUsedCards(reward);
                                        }}
                                    />
                                    {error && (
                                        <p
                                            style={{
                                                textAlign: "center",
                                                position: "absolute",
                                                color: "red",
                                                margin: "0",
                                            }}
                                        >
                                            {error}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
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
                    />
                ))}
            </div>
        </>
    );
};

export default RewardsCardsSideshow;
