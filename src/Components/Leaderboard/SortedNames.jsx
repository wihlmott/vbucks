import { Fragment } from "react";
import { colors } from "../../config";

const SortedNames = ({ array, mini = false }) => {
    const styles = {
        listContainer: { marginTop: "-16px", position: "relative" },
        listItem: {
            color: "white",
            margin: mini ? "0" : "16px 0",
            paddingTop: "24px",
            textShadow: colors.textShadowHeading,
            fontSize: mini ? ".73rem" : "1.1rem",
        },
        divider: {
            borderBottom: "1px solid rgba(0,0,0,0.3)",
            width: "100%",
            left: "0",
            position: "absolute",
        },
        first: { fontWeight: "bold", fontSize: mini ? ".9rem" : "1.35rem" },
        second: { fontWeight: "bold", fontSize: mini ? ".75rem" : "1.2rem" },
        points: { float: "right", marginRight: "5px" },
    };
    return (
        <ol style={styles.listContainer}>
            {array.map((user, i) => (
                <Fragment key={i}>
                    <li
                        style={
                            i == 0
                                ? {
                                      ...styles.listItem,
                                      ...styles.first,
                                  }
                                : i == 1
                                ? {
                                      ...styles.listItem,
                                      ...styles.second,
                                  }
                                : styles.listItem
                        }
                    >
                        <span>{user.name}</span>
                        <span style={styles.points}>{user.totalPoints}</span>
                    </li>
                    <div style={styles.divider}></div>
                </Fragment>
            ))}
        </ol>
    );
};

export default SortedNames;
