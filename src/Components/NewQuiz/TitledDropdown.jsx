import { MdKeyboardArrowDown } from "react-icons/md";
import Dropdown from "./Dropdown";
import { usePersistedState } from "../../hooks/usePersistedState";

const TitledDropdown = ({
    title,
    value = false,
    sendValue = () => {},
    userID,
    selectedValue = "-- -- -- --",
}) => {
    const [dropOpen, setDropOpen] = usePersistedState(
        { user: userID, topic: "drop", value: title },
        false
    );
    const handleOpen = () => setDropOpen(!dropOpen);
    const handleClick = (e) => sendValue(e);

    return (
        <>
            <p style={styles.title}>{title.replaceAll("_", " ")}:</p>
            <div onClick={handleOpen}>
                {dropOpen ? (
                    value.map((value) => (
                        <Dropdown
                            key={value.text}
                            value={value.text}
                            sendClicked={handleClick}
                        />
                    ))
                ) : (
                    <Dropdown
                        icon={<MdKeyboardArrowDown />}
                        value={selectedValue}
                    />
                )}
            </div>
        </>
    );
};

const styles = {
    title: {
        textTransform: "capitalize",
        fontWeight: "bold",
        margin: "16px 0 0px 0",
    },
};

export default TitledDropdown;
