import DescriptionPopup from "./DescriptionPopup";

const DescriptionBtn = ({
    usable = false,
    description = `show description`,
    color = false,
    openDesc = false,
}) => {
    const styles = {
        btn: {
            display: usable.usable ? "" : "none",
            textAlign: "center",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            color: color,
            textShadow: `2px 2px 8px rgba(0,0,0,0.3)`,
            position: "absolute",
            zIndex: "2",
            top: "-220px",
            left: "0",
            right: "0",
            boxShadow: "1px 1px 12px rgba(0,0,0,0.30)",
            padding: "24px",
            width: "50%",
            margin: "auto",
            fontSize: "1.1rem",
        },
    };

    return (
        <>
            {!usable.open && (
                <div
                    style={styles.btn}
                    onClick={() => {
                        if (!usable) return;
                        openDesc();
                    }}
                >
                    description
                </div>
            )}
            {usable.open && <DescriptionPopup description={description} />}
        </>
    );
};

export default DescriptionBtn;
