import { useContext } from "react";
import { colors } from "../config";
import { UserContext } from "../context/context";

const WelcomeHeader = ({ message = false }) => {
    const [user, _] = useContext(UserContext);

    const [name] = user;

    return (
        <div style={styles.header}>
            <>
                <h1 style={styles.welcome}>Welcome</h1>
                <h1 style={{ ...styles.user, ...styles.firstLetter }}>
                    {name[0]}
                </h1>
                <h1 style={styles.user}>{name.slice(1)}</h1>
            </>
            {message && <h3 style={styles.message}>{message}</h3>}
            <hr style={styles.borderline} />
        </div>
    );
};

const styles = {
    header: {
        width: "98vw",
        overflow: "hidden",
        marginBottom: "-5px",
    },
    welcome: {
        display: "inline",
        padding: "0 8px 0 16px",
    },
    firstLetter: {
        fontSize: "42px",
    },
    user: {
        display: "inline",
        textTransform: "uppercase",
        fontStyle: "italic",
        textShadow: colors.textShadowHeading,
    },
    message: {
        color: "rgba(0,0,0,1)",
        textShadow: colors.textShadowHeading,
        padding: "0 16px",
        marginBottom: "10px",
        marginTop: "8px",
    },
    borderline: {
        color: colors.grey,
        width: "90%",
    },
};

export default WelcomeHeader;
