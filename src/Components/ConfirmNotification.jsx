const ConfirmNotification = ({ message = "confirm", status }) => {
    return (
        <div
            style={{
                boxShadow: `1px 1px 4px rgba(0,0,0,.75)`,
                width: "200px",
                height: "auto",
                padding: "10px",
                margin: "auto",
                background: status ? "lime" : "rgba(250,0,0,.9)",
                color: "white",
                textShadow: `1px 1px 4px rgba(0,0,0,.75)`,
            }}
        >
            {message}
        </div>
    );
};

export default ConfirmNotification;
