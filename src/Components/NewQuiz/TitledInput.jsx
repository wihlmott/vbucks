import Input from "../Inputs/Input";

const TitledInput = ({ title, value = false, sendValue = () => {} }) => (
    <div>
        <p style={styles.title}>{title}:</p>
        <Input
            type="text"
            placeholder={title}
            value={value ? value : ""}
            sendValue={sendValue}
        />
    </div>
);

const styles = {
    title: {
        textTransform: "capitalize",
        fontWeight: "bold",
        margin: "16px 0 -4px 0",
    },
};

export default TitledInput;
