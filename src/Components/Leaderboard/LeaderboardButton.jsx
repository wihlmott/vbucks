import leaderboardIMG from "../../assets/Images/Leaderboard.jpg";

const LeaderboardButton = ({ handleClick }) => {
    return (
        <span onClick={handleClick}>
            <img
                src={leaderboardIMG}
                alt="leaderboard img"
                style={styles.leaderboardButton}
            />
        </span>
    );
};

const styles = {
    leaderboardButton: {
        position: "absolute",
        right: "0",
        marginRight: "30px",
        marginTop: "-90px",
        width: "46px",
        borderRadius: "8px",
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,.7))",
    },
};

export default LeaderboardButton;
