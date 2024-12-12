const InvalidFields = ({ array }) => (
    <>
        <p style={styles.invalidFieldsHeading}>invalid fields:</p>
        {array.map((field) => (
            <p key={field} style={styles.invalidFields}>
                {field}
            </p>
        ))}
    </>
);

const styles = {
    invalidFieldsHeading: { color: "red" },
    invalidFields: { color: "red", margin: "2px" },
};

export default InvalidFields;
