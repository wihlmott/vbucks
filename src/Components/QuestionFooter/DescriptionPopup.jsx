import { useEffect, useState } from "react";

const DescriptionPopup = ({ description }) => {
    const [bottom, setBottom] = useState("0");

    useEffect(() => {
        setBottom("50%");
    }, []);

    const styles = {
        desc: {
            position: "fixed",
            left: "0",
            right: "0",
            margin: "auto",
            background: "white",
            zIndex: "2",
            bottom: bottom,
            boxShadow: "2px 2px 10px grey",
            borderRadius: "20px",
            padding: "24px 16px",
            width: "84dvw",
            textTransform: "initial",
            transition: "bottom 0.8s",
        },
    };

    return <div style={styles.desc}>{description}</div>;
};

export default DescriptionPopup;
