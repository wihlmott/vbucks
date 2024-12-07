const Input = ({
    margin = "8",
    widthMax = false,
    placeholder = false,
    status = false,
    value = "",
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
                width: widthMax ? `calc(100% - ${margin * 2}px)` : "240px",
                padding: "10px",
                border: `1px solid rgba(${error ? "255" : "0"},0,0,0.4)`,
                borderRadius: "4px",
                margin: `${margin}px`,
            }}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
    );
};

export default Input;
