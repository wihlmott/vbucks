import { IoCloseSharp } from "react-icons/io5";

const CloseButton = ({ submitHandler = () => {}, display = true }) => {
    const styles = {
        closeIcon: {
            display: display ? "inherit" : "none",
            position: "absolute",
            top: "0",
            right: "0",
            fontSize: "1.25rem",
            filter: "drop-shadow(1px 1px 2px rgba(0,0,0,.65))",
            padding: "5px",
        },
    };
    return <IoCloseSharp style={styles.closeIcon} onClick={submitHandler} />;
};

export default CloseButton;
