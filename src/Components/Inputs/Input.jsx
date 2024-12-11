const Input = ({
    margin = "8",
    widthMax = false,
    placeholder = false,
    value = "",
    long = false,
    type,
    error = false,
    sendValue = () => {},
}) => {
    const handleChange = (e) =>
        sendValue({ value: e.target.value, placeholder: placeholder });

    const styles = {
        input: {
            boxSizing: "border-box",
            width: widthMax ? `calc(100% - ${margin * 2}px)` : "240px",
            padding: "10px",
            border: `1px solid rgba(${error ? "255" : "0"},0,0,0.4)`,
            borderRadius: "4px",
            margin: `${margin}px`,
        },
    };

    return long ? (
        <textarea
            type={type}
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
    ) : (
        <input
            type={type}
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
    );
};

export default Input;
