import { themeColor, colors, rewards } from "../config";
import RewardsCardsSideshow from "../Components/RewardsCardsSlideshow.jsx";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/context.jsx";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [user, _] = useContext(UserContext);

    const navigator = useNavigate();
    useEffect(() => {
        if (user[0] == "teacher") navigator("/login");
    }, [user]);

    const [selectedSubject, setSelectedSubject] = useState({
        subject: "",
        score: "0",
    });

    const [name, surname, regClass, subjects, quiz_completed, rewards_used] =
        user;

    const subjectArray = subjects?.map((subject) => {
        const totalScore = quiz_completed
            .filter((el) => el.split("-")[0] == subject)
            .reduce(
                (acc, curr) =>
                    acc + parseInt(curr.split("-")[curr.split("-").length - 2]),
                0
            );

        const scoreUsed = rewards_used
            .filter((el) => el.split("-")[0] == subject)
            .reduce(
                (acc, curr) =>
                    acc + parseInt(curr.split("-")[curr.split("-").length - 2]),
                0
            );

        return {
            subject: subject,
            score: totalScore - scoreUsed,
        };
    });

    const handleSubjectChange = (e) =>
        setSelectedSubject(() => {
            return {
                subject: e.target.innerHTML.split(" ")[0],
                score: e.target.innerHTML.split(" ")[2],
            };
        });

    return (
        <div style={styles.outterDiv}>
            <h3 style={styles.headerText}>{name}</h3>
            <div style={{ ...styles.container, ...styles.topContainer }}>
                <RewardsCardsSideshow
                    rewards={rewards}
                    points={selectedSubject.score}
                    subject={selectedSubject.subject}
                />
            </div>
            <div
                style={{
                    ...styles.container,
                    ...styles.bottomContainer,
                }}
            >
                <h4 style={styles.title}>name:</h4>
                <h3 style={styles.text}>{`${name} ${surname}`}</h3>
                <h4 style={styles.title}>class:</h4>
                <h3 style={styles.text}>{regClass}</h3>
                <h4 style={styles.title}>Subjects:</h4>
                <div style={styles.subjects}>
                    {subjectArray?.map((el) => {
                        return (
                            <h3
                                key={el.subject}
                                style={
                                    el.subject == selectedSubject.subject
                                        ? styles.selectedSubject
                                        : styles.unselectedSubject
                                }
                                onClick={handleSubjectChange}
                            >{`${el.subject} - ${el.score}`}</h3>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const styles = {
    headerText: {
        textTransform: "capitalize",
        display: "inline-block",
        margin: 0,
        width: "100vw",
        textAlign: "center",
        color: "white",
        textShadow: colors.textShadowHeading,
    },
    outterDiv: {
        height: "calc(100vh - 60px)",
        width: "100vw",
        background: themeColor.gradient,
        display: "flex",
        justifyContent: "center",
    },
    container: {
        boxSizing: "border-box",
        position: "absolute",
        width: "90vw",
        height: "40vh",
        padding: "8px",
    },
    topContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "48px 0",
    },
    bottomContainer: {
        bottom: "61px",
        boxShadow: `0 -5px 20px 2px ${themeColor.color}`,
        borderRadius: "20px 20px 0px 0px",
        background: "rgba(255,255,255,0.1)",
        overflow: "hidden",
    },
    title: {
        fontSize: ".8rem",
        color: "rgba(255,255,255,0.9)",
        textShadow: colors.textShadowHeading,
        textTransform: "capitalize",
        marginBottom: "0",
    },
    text: {
        margin: "5px 0px",
        fontSize: "1.1rem",
        textShadow: colors.textShadowHeading,
        borderBottom: `1px solid ${themeColor.color}`,
        textTransform: "capitalize",
    },
    subjects: {
        height: "165px",
        overflowY: "scroll",
        boxShadow: "1px 1px 16px rgba(0,0,0,.35) inset",
        padding: "0 5px",
        borderRadius: "20px 20px 0px 0px",
        marginTop: "6px",
    },
    selectedSubject: {
        textShadow: "4px 4px 9px rgba(255,180,0,0.9)",
        fontSize: "1.1rem",
        textTransform: "capitalize",
        borderBottom: `1px solid ${themeColor.color}`,
        transitionProperty: "font-size",
        transitionDuration: "0.2s",
    },
    unselectedSubject: {
        fontSize: "1rem",
        textShadow: colors.textShadowHeading,
        borderBottom: `1px solid ${themeColor.color}`,
        textTransform: "capitalize",
        transitionProperty: "font-size",
        transitionDuration: "0.1s",
    },
};

export default ProfilePage;
