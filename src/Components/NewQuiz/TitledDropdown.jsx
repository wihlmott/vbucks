import { MdKeyboardArrowDown } from "react-icons/md";
import Dropdown from "./Dropdown";
import { usePersistedState } from "../../hooks/usePersistedState";

const TitledDropdown = ({
    title,
    value = false,
    sendValue = () => {},
    userID,
}) => {
    const [selectedState, setSelectedState] = usePersistedState(
        { user: userID, topic: "drop", value: title },
        {
            value: "-- -- -- --",
            open: false,
        }
    );
    const handleOpen = () =>
        setSelectedState((prev) => {
            return { ...prev, open: !prev.open };
        });
    const handleClick = (e) => {
        sendValue(e);
        setSelectedState((prev) => {
            return { ...prev, value: e };
        });
    };

    const resetDrop = () =>
        setSelectedState({
            value: "-- -- -- --",
            open: false,
        });

    return (
        <>
            <p style={styles.title}>{title.replaceAll("_", " ")}:</p>
            <div onClick={handleOpen}>
                {selectedState.open ? (
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
                        value={selectedState.value}
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
