import { themeColor, colors, rewards } from "../config";
import RewardsCardsSideshow from "../Components/RewardsCardsSlideshow.jsx";
import LeaderboardButton from "../Components/LeaderboardButton.jsx";
import { useContext, useState } from "react";
import { UserContext } from "../context/context.jsx";

const ProfilePage = () => {
    const [user, _] = useContext(UserContext);
    const [selectedSubject, setSelectedSubject] = useState({
        subject: "",
        score: "0",
    });

    const [name, surname, regClass, subjects] = user;
    const subjectArray = subjects
        .split(",")
        .map((el) => el.split(`"`)[1])
        .map((el) => {
            return { subject: el.split(" ")[0], score: el.split(" ")[2] };
        });

    const handleSubjectChange = (e) => {
        setSelectedSubject(() => {
            return {
                subject: e.target.innerHTML.split(" ")[0],
                score: e.target.innerHTML.split(" ")[2],
            };
        });
    };

    return (
        <div style={styles.outterDiv}>
            <h2 style={styles.headerText}>{name}</h2>
            <div style={{ ...styles.container, ...styles.topContainer }}>
                <RewardsCardsSideshow
                    rewards={rewards}
                    points={selectedSubject.score}
                />
            </div>
            <div style={{ ...styles.container, ...styles.bottomContainer }}>
                <div style={{ margin: "-65px 0 50px 0", float: "right" }}>
                    <LeaderboardButton />
                </div>
                <h4 style={styles.title}>name:</h4>
                <h3 style={styles.text}>{`${name} ${surname}`}</h3>
                <h4 style={styles.title}>class:</h4>
                <h3 style={styles.text}>{regClass}</h3>
                <h4 style={styles.title}>Subjects:</h4>

                {subjectArray.map((el) => {
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
        padding: "5px",
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
    },
    title: {
        color: "rgba(255,255,255,0.9)",
        textShadow: colors.textShadowHeading,
        textTransform: "capitalize",
        marginBottom: "0",
    },
    text: {
        margin: "5px 0px",
        textShadow: colors.textShadowHeading,
        borderBottom: `1px solid ${themeColor.color}`,
        textTransform: "capitalize",
    },
    selectedSubject: {
        textShadow: "4px 4px 9px rgba(255,180,0,0.9)",
        fontSize: "1.5rem",
        textTransform: "capitalize",
        borderBottom: `1px solid ${themeColor.color}`,
        transitionProperty: "font-size",
        transitionDuration: "0.2s",
    },
    unselectedSubject: {
        textShadow: colors.textShadowHeading,
        borderBottom: `1px solid ${themeColor.color}`,
        textTransform: "capitalize",
        transitionProperty: "font-size",
        transitionDuration: "0.1s",
    },
};

export default ProfilePage;
