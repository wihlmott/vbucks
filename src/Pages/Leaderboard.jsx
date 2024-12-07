import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import { colors, themeColor } from "../config";
import { db } from "../database/databases";
import SortedNames from "../Components/Leaderboard/SortedNames";
import { sortArray } from "../utils/helperFunctions";

const Leaderboard = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const init = async () => {
        try {
            const response = await db.users.list();
            const users = sortArray(response.documents);

            setAllUsers(users);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        init();
    }, []);

    return (
        <div style={styles.outterDiv}>
            <h2 style={styles.heading}>Leaderboard</h2>
            <div style={styles.container}>
                {loading && <Loading />}
                {!loading && <SortedNames array={allUsers} />}
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
};

export default Leaderboard;
