const Dropdown = ({ icon = false, value = false, sendClicked = () => {} }) => {
    const handleClick = () => sendClicked(value);

    return (
        <div style={styles.box} onClick={handleClick}>
            {value ? value : "-- -- -- --"}
            {icon && <span style={styles.icon}>{icon}</span>}
        </div>
    );
};

const styles = {
    box: {
        alignContent: "center",
        position: "relative",
        boxSizing: "border-box",
        display: "block",
        height: "40px",
        margin: "2px auto",
        cursor: "pointer",
        width: "240px",
        border: `1px solid rgba(0,0,0,0.4)`,
        borderRadius: "4px",
        boxShadow: "1px 1px 6px rgba(0,0,0,.25)",
        fontSize: ".85rem",
    },
    icon: { float: "right", marginRight: "14px" },
};

export default Dropdown;
