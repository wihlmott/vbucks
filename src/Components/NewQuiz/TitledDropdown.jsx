import SelectButton from "../Inputs/Input";

const TitledDropdown = ({ title, value = false, sendValue = () => {} }) => (
    <div>
        <p style={styles.title}>{title}:</p>
        <SelectButton value={value} sendValue={sendValue} />
    </div>
);

const styles = {
    title: {
        textTransform: "capitalize",
        fontWeight: "bold",
        margin: "16px 0 -4px 0",
    },
};

export default TitledDropdown;
