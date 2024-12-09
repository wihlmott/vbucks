const SelectButton = ({ value, sendValue }) => {
    const handleClick = () => sendValue(value);

    return (
        <div style={styles.input} onClick={handleClick}>
            {value}
        </div>
    );
};

const styles = {
    input: {
        position: "relative",
        boxSizing: "border-box",
        display: "inline-block",
        width: "44px",
        height: "44px",
        padding: "0px",
        border: `1px solid rgba(0,0,0,0.4)`,
        borderRadius: "4px",
        margin: "2px 4px",
        textAlign: "center",
        fontSize: "1.35rem",
        fontWeight: "bold",
        paddingTop: "5px",
        boxShadow: "1px 1px 4px rgba(0,0,0,.25)",
    },
};

export default SelectButton;
