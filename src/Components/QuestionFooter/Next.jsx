import { BiSolidRightArrow } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";

const Next = ({
    arrowDirection = false,
    leftUSE = false,
    rightUSE = false,
    color = false,
    usableDesc = false,
}) => {
    let usable;

    if (arrowDirection == "left") usable = leftUSE;
    if (arrowDirection == "right") usable = rightUSE;

    const styles = {
        box: {
            boxSizing: "border-box",
            display: "inline-block",
            width: "72px",
            borderRadius: "20px",
            background: usable ? color : "rgba(0,0,0,.5)",
            boxShadow: "2px 2px 5px rgba(0,0,0,.3)",
            aspectRatio: "1",
            textAlign: "center",
            margin: "15px",
            padding: "0 5px",
            float: arrowDirection,
        },
        icon: {
            marginTop: "20px",
            fontSize: "2rem",
            color: "white",
            textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
            transform: arrowDirection == "left" ? "rotate(180deg)" : "",
        },
    };

    return (
        <div style={styles.box}>
            {arrowDirection == "right" ? (
                usableDesc.usable ? (
                    <BiSolidRightArrow style={styles.icon} />
                ) : (
                    <FaCheck style={styles.icon} />
                )
            ) : (
                <BiSolidRightArrow style={styles.icon} />
            )}
        </div>
    );
};

export default Next;
