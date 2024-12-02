import { useEffect, useState } from "react";

const DescriptionPopup = ({ description }) => {
    const [marginTop, setMarginTop] = useState("0");

    useEffect(() => {
        setMarginTop("-300px");
    }, []);

    const styles = {
        desc: {
            position: "absolute",
            left: "0",
            right: "0",
            margin: "auto",
            background: "white",
            zIndex: "2",
            marginTop: marginTop,
            boxShadow: "2px 2px 10px grey",
            borderRadius: "20px",
            padding: "24px 16px",
            width: "84dvw",
            textTransform: "initial",
            transition: "margin-top 0.8s",
        },
    };

    return <div style={styles.desc}>{description}</div>;
};

export default DescriptionPopup;
