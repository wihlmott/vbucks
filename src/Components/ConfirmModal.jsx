import { TiWarningOutline } from "react-icons/ti";
import { colors } from "../config";
import Button from "./Button";

const ConfirmModal = ({ title, message, sendClick }) => {
    const styles = {
        overlay: {
            position: "fixed",
            top: "0",
            zIndex: "2",
            height: "100vh",
            width: "100vw",
            background: "rgba(0,0,0,0.2)",
        },
        card: {
            zIndex: "6",
            position: "absolute",
            width: "300px",
            height: "225px",
            margin: "auto",
            borderRadius: "12px",
            background: "white",
            left: "0",
            right: "0",
            bottom: "0",
            transform: "translateY(-200%)",
        },
        title: {
            margin: "0",
            textShadow: `1px 1px 4px ${colors.grey}`,
        },
        message: { marginTop: "2px", color: "rgba(0,0,0,.6)" },
    };

    const buttons = ["cancel", "confirm"];
    return (
        <div style={styles.overlay} onClick={(e) => sendClick("cancel")}>
            <div style={styles.card}>
                <TiWarningOutline style={{ fontSize: "3rem", margin: "0" }} />
                <h2 style={styles.title}>{title}</h2>
                <h3 style={styles.message}>{message}</h3>
                {buttons.map((type) => (
                    <Button
                        key={type}
                        text={type}
                        width="40%"
                        cancel={type == "cancel"}
                        submitHandler={() => {
                            sendClick(type);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ConfirmModal;
