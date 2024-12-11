const SearchedQuizTitles = ({ titles, sendValue = () => {} }) => (
    <div style={styles.box}>
        <p>existing quiz_titles</p>
        {titles.map((title) => (
            <p
                key={title}
                style={styles.button}
                onClick={() => sendValue(title)}
            >
                {title}
            </p>
        ))}
    </div>
);

const styles = {
    box: {
        position: "absolute",
        textAlign: "center",
        left: "0",
        right: "0",
        margin: "auto",
        width: "280px",
        zIndex: "2",
        background: "white",
        boxShadow: "1px 1px 8px rgba(0,0,0,.3)",
    },
    button: {
        boxShadow: "1px 1px 8px rgba(0,0,0,.3)",
        height: "auto",
        margin: "0",
        padding: "6px",
        fontSize: ".85rem",
    },
};

export default SearchedQuizTitles;
