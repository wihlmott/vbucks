import { TbScoreboard } from "react-icons/tb";
import { Link } from "react-router-dom";

const LeaderboardButton = () => (
    <Link to={"./leaderboard"} style={{ zIndex: "5" }}>
        <TbScoreboard style={styles.button} />
    </Link>
);

const styles = {
    button: {
        display: "inline-block",
        color: "white",
        fontSize: "2rem",
        borderRadius: "50%",
        boxShadow: "1px 1px 10px rgba(0,0,0,0.5)",
        padding: "8px",
    },
};

export default LeaderboardButton;
