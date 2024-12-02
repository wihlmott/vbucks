const Input = ({
    placeholder = false,
    type,
    error = false,
    sendValue = () => {},
}) => {
    const handleChange = (e) =>
        sendValue({ value: e.target.value, placeholder: placeholder });

    return (
        <input
            type={type}
            style={{
                boxSizing: "border-box",
                width: "240px",
                padding: "10px",
                border: `1px solid rgba(${error ? "255" : "0"},0,0,0.4)`,
                borderRadius: "4px",
                margin: "8px",
            }}
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

export default Input;
