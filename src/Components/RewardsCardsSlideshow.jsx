import { useContext, useEffect, useState } from "react";
import { colors } from "../config";
import { db } from "../database/databases";
import { UserContext } from "../context/context";
import GlossyButton from "./GlossyButton";
import { getFormattedDate } from "../utils/helperFunctions";
import UsedIndication from "./UsedIndication";
import CloseButton from "./CloseButton";

const themeColor = {
    gradient: colors.gradients[0],
    color: colors.gradients[0].split(" ")[1],
};
const cardWidth = "160px";

const RewardsCardsSideshow = ({ rewards, points, subject }) => {
    const [user, setUser] = useContext(UserContext);

    const [name, surname, a, b, c, rewards_used] = user;
    const userID = (name + surname).toLowerCase();
    const usedCards = rewards_used?.map((reward) => {
        return {
            subject: reward.split("-")[0],
            reward: reward.split("-")[1],
            value: reward.split("-")[2],
            date: reward.split("-")[3],
        };
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const [move, setMove] = useState(0);

    const [error, setError] = useState();
    const [scale, setScale] = useState(false);

    const [pointsState, setPointsState] = useState(points);
    useEffect(() => {
        setPointsState(points);
    }, [points]);

    const updateUsedCards = (reward) => {
        const dateStr = getFormattedDate();

        try {
            const payload = {
                rewards_used: [
                    ...rewards_used,
                    `${subject}-${reward.id}-${dateStr}`,
                ],
            };
            db.users.update(userID, payload);
            setUser(() => [name, surname, a, b, c, payload.rewards_used]);
            setPointsState((prev) => prev - 100);
        } catch (error) {
            console.error(error);
        }
    };

    const closeCard = () => {
        setScale(false);
        setError("");
    };

    const onTouchStartHandler = (e) => {
        setTouchStartX(e.targetTouches[0].clientX);
        setTouchEndX(e.targetTouches[0].clientX);
    };
    const onTouchMoveHandler = (e) => {
        setTouchEndX(e.targetTouches[0].clientX);
        setMove(touchEndX - touchStartX);
    };

    const onTouchEndHandler = (e) => {
        if (move > 60) setCurrentIndex((prev) => (prev == 0 ? prev : prev - 1));
        if (move < -60)
            setCurrentIndex((prev) =>
                prev == rewards.length - 1 ? prev : prev + 1
            );

        setMove(0);
    };

    // const translatePartial = (toTranslate) => {};

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
            bottom: "86px",
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
            // transform: `translateX(${translateDist})`,
            background: `rgba(255,255,255,1)`,
            zIndex: "2",
        },

        leftCard: {
            marginLeft: "-160px",
        },
        rightCard: {
            marginLeft: "160px",
        },

        card: {
            position: "absolute",
            top: "10px",
            height: scale ? "200px" : "190px",
            width: cardWidth,
            display: "inline",
            borderRadius: "20px",
            boxShadow: `0 -5px 20px 2px ${themeColor.color}`,
            background: `rgba(255,255,255,${true ? "0.3" : "1"})`,
            cursor: "pointer",
        },

        cardImg: {
            position: "absolute",
            top: "0",
            bottom: "0",
            margin: "auto",
            width: "100px",
            marginLeft: "30px",
            filter: `drop-shadow(0 30px 20px rgba(255,255,255,0.45))`,
        },
        cardBig: {
            position: "absolute",
            width: "100%",
            scale: ".60",
            textAlign: "center",
            bottom: "0",
        },
        cardTitle: {
            position: "absolute",
            margin: "0",
            bottom: "280px",
            display: "inline",
            textAlign: "center",
            textShadow: "1px 1px 4px rgba(0,0,0,.3)",
        },
        errorMessage: {
            textAlign: "center",
            position: "absolute",
            color: "red",
            margin: "0",
        },
    };

    return (
        <>
            {scale && <div style={styles.overlay} onClick={closeCard} />}
            {rewards.map((reward, i) => {
                let styleObj = {};
                if (i == currentIndex)
                    styleObj = {
                        ...styles.card,
                        ...styles.focusedCard,
                        scale: scale ? "1.55" : "1",
                        marginLeft: "0",
                        marginTop: scale ? "80px" : "0",
                        background:
                            points >= 100
                                ? "orange"
                                : `linear-gradient(0deg, orange 0%, white ${points}%)`,
                        transitionProperty:
                            "background, scale, transform, margin-left, margin-top",
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
                if (Math.abs(i - currentIndex) > 1)
                    styleObj = { display: "none" };

                return (
                    <div
                        key={i}
                        id={i}
                        style={styleObj}
                        onClick={(e) => {
                            if (i == currentIndex) setScale(true);
                            setCurrentIndex(i);
                        }}
                        onTouchStart={(e) => onTouchStartHandler(e)}
                        onTouchMove={(e) => onTouchMoveHandler(e)}
                        onTouchEnd={(e) => onTouchEndHandler(e)}
                    >
                        <CloseButton
                            submitHandler={(e) => {
                                e.stopPropagation();
                                closeCard();
                            }}
                            display={scale}
                        />
                        {
                            <img
                                style={styles.cardImg}
                                src={reward.img}
                                alt={reward.id}
                            />
                        }
                        {usedCards?.map((usedCard) => {
                            if (
                                usedCard.subject == subject &&
                                usedCard.reward == reward.id &&
                                i == currentIndex
                            )
                                return (
                                    <UsedIndication
                                        date={usedCard.date}
                                        key={usedCard}
                                    />
                                );
                        })}
                        <div style={styles.cardBig}>
                            {scale && i == currentIndex && (
                                <>
                                    <h2 style={styles.cardTitle}>
                                        {reward.id}
                                    </h2>
                                    <GlossyButton
                                        text="use"
                                        width="58%"
                                        fontSize="1.2rem"
                                        borderRadius="12px"
                                        submitHandler={() => {
                                            if (pointsState < reward.value)
                                                setError(
                                                    `need ${reward.value} points to use`
                                                );
                                            if (pointsState >= reward.value)
                                                updateUsedCards(reward);
                                        }}
                                    />
                                    {error && (
                                        <p style={styles.errorMessage}>
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
