import { AiOutlineLoading3Quarters } from "react-icons/ai";
import classes from "./Loading.module.css";

const Loading = () => {
    return (
        <div
            style={{
                position: "absolute",
                textAlign: "center",
                height: "30px",

                margin: "auto",
                left: "0",
                right: "0",
                bottom: "0",
                top: "0",
            }}
        >
            <AiOutlineLoading3Quarters
                className={classes.element}
                style={styles.icon}
            />
        </div>
    );
};

const styles = {
    icon: {
        fontSize: "2.5rem",
        filter: "drop-shadow(3px 2px 8px rgba(0,0,0,.4))",
        animation: "",
    },
};

export default Loading;
