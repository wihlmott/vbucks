import { Fragment } from "react";
import { colors, themeColor } from "../config";

const DUMMY = ["Wihlmott", "Ivan", "Theodore"];

const Leaderboard = () => {
    return (
        <div style={styles.outterDiv}>
            <h2 style={styles.heading}>Leaderboard</h2>
            <div style={styles.container}>
                <ol style={{ marginTop: "-16px" }}>
                    {DUMMY.map((name, i) => (
                        <Fragment key={i}>
                            <li style={styles.listItem}>{name}</li>
                            <div style={styles.divider}></div>
                        </Fragment>
                    ))}
                </ol>
            </div>
        </div>
    );
};

const styles = {
    heading: { color: "white", textShadow: colors.textShadowHeading },
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
        height: "82vh",
        padding: "0 5px",
        marginTop: "64px",
        boxShadow: `0 -5px 20px 2px ${themeColor.color}`,
        borderRadius: "20px 20px 0px 0px",
        background: "rgba(255,255,255,0.1)",
    },
    listItem: {
        color: "white",
        margin: "16px 0",
        paddingTop: "24px",
        textShadow: colors.textShadowHeading,
    },
    divider: {
        borderBottom: "1px solid rgba(0,0,0,0.3)",
        width: "100%",
        left: "0",
        position: "absolute",
    },
};

export default Leaderboard;
