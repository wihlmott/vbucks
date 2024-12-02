import { IoArrowBackCircleOutline } from "react-icons/io5";
import { colors } from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({
    title = false,
    message = false,
    color = "white",
    heightFixed = false,
    messageSize = false,
    centerText = false,
    shadowColor = colors.grey,
    children,
}) => {
    const marginValue = "6px";

    const [marginTop, setMarginTop] = useState("-200px");
    useEffect(() => {
        setMarginTop(marginValue);
    }, []);

    const navigation = useNavigate();

    const styles = {
        headingBox: {
            marginTop: marginTop,
            marginLeft: marginValue,
            marginRight: marginValue,
            boxSizing: "border-box",
            padding: "12px",
            borderRadius: "25px",
            height: heightFixed ? "200px" : "auto",
            width: `calc(100vw - ${marginValue * 2})`,
            boxShadow: `0px 3px 5px ${shadowColor}`,
            background: color,
            transitionProperty: "margin",
            transitionDuration: "1s",
        },
        headingText: {
            color: color == "white" ? "black" : "white",
            textShadow: colors.textShadowHeading,
            fontSize: "1.75rem",
            margin: "0",
        },
        text: {
            color: color == "white" ? "black" : "white",
            textShadow: colors.textShadowHeading,
            fontSize: messageSize ? messageSize : "1rem",
            textAlign: centerText ? "center" : "",
        },
        arrow: {
            fontSize: "3rem",
            position: "absolute",
            right: "10px",
            top: "10px",
            cursor: "pointer",
            color: color == "white" ? "black" : "white",
        },
    };

    return (
        <div style={styles.headingBox}>
            {title && (
                <h3 style={styles.headingText}>
                    {title[0].toUpperCase()}
                    {title.slice(1)}
                </h3>
            )}
            {message && (
                <h4 style={styles.text}>
                    {message[0].toUpperCase()}
                    {message.slice(1)}
                </h4>
            )}
            {children}
            <div
                style={styles.arrow}
                onClick={() => {
                    navigation(-1);
                }}
            >
                <IoArrowBackCircleOutline />
            </div>
        </div>
    );
};

export default Header;
