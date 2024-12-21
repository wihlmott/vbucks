const GlossyButton = ({
    text = "text",
    submitHandler = () => {},
    width = false,
    fontSize = false,
    borderRadius = false,
}) => {
    const sendHandler = (e) => submitHandler(e);

    return (
        <button
            style={{
                boxSizing: "border-box",
                backgroundImage:
                    "linear-gradient(hsla(0, 0%, 100%, 0.6), hsla(0, 0%, 100%, 0) 50%,hsla(0, 0%, 0%, 0.3) 50%, hsla(0, 0%, 100%, 0.2))",
                boxShadow:
                    "inset 0 -5px 20px hsla(0, 0%, 0%, 0.4), inset 0 5px 20px hsla(0, 0%, 100%, 0.4),-8px 8px 5px hsla(0, 0%, 0%, 0.15),5px 18px 10px hsla(0, 0%, 0%, 0.2),",
                textShadow:
                    "0 0 15px hsla(0, 0%, 100%, 1),0 2px 4px hsla(0, 0%, 0%, 0.7)",
                background:
                    "linear-gradient(hsla(0, 0%, 100%, 0.8), hsla(0, 0%, 100%, 0) )",
                backgroundColor: "#6C6",
                border: "none",

                width: width ? width : "240px",
                padding: "16px",
                borderRadius: borderRadius ? borderRadius : "4px",
                color: "white",
                textAlign: "center",
                cursor: "pointer",
            }}
            type="submit"
            onClick={sendHandler}
        >
            <p style={{ margin: "0", fontSize: fontSize }}>{text}</p>
        </button>
    );
};

export default GlossyButton;
