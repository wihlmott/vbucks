const UsedIndication = ({ date = false }) => (
    <div style={styles.div}>
        <h1 style={styles.usedText}>used</h1>
        <p style={styles.dateText}>{date}</p>
    </div>
);

const styles = {
    div: {
        color: "red",
        textTransform: "uppercase",
        textAlign: "center",
        rotate: "-42deg",
        textShadow: "2px 2px 16px rgba(0,0,0,.8)",
    },
    usedText: {
        margin: "70px 0 0 0",
        fontSize: "2.5rem",
    },
    dateText: {
        margin: "0",
    },
};

export default UsedIndication;
