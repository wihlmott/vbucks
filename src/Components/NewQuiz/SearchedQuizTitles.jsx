const SearchedQuizTitles = ({ titles, sendValue = () => {} }) => (
    <div style={styles.box}>
        <p>existing quiz_titles</p>
        {titles.map((title) => (
            <div
                key={title.title}
                style={styles.button}
                onClick={() => sendValue(title.title)}
            >
                <p style={{ display: "inline-block" }}>{title.title} </p>
                <p style={{ display: "inline-block", float: "right" }}>
                    -- {title.amount} {title.amount == 1 ? "entry" : "entries"}
                </p>
            </div>
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
        display: "flex",
        flexDirection: "column",
    },
    button: {
        boxShadow: "1px 1px 8px rgba(0,0,0,.3)",
        height: "auto",
        margin: "0",
        padding: "4px",
        fontSize: ".85rem",
    },
};

export default SearchedQuizTitles;
