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
        width: "40px",
        height: "37px",
        padding: "0px",
        border: `1px solid rgba(0,0,0,0.4)`,
        borderRadius: "4px",
        margin: "2px 4px",
        textAlign: "center",
        fontSize: "1.25rem",
        fontWeight: "bold",
        paddingTop: "1px",
    },
};

export default SelectButton;
