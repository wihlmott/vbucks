const ProgressBar = ({ value, full }) => {
    const borderRadius = "5px";
    const height = "6px";

    const styles = {
        outterBox: {
            boxSizing: "border-box",
            width: "calc(100% - 20px)",
            height: height,
            margin: "10px 10px",
            borderRadius: borderRadius,
            boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
            background: "rgba(255,255,255,0.9)",
        },
        innerBox: {
            background:
                "linear-gradient(99deg, rgb(255, 166, 0) 14.7%, rgb(255, 99, 97) 73%)",
            width: full ? "100%" : `${(value.done / value.max) * 100}%`,
            height: height,
            borderRadius: borderRadius,
            transitionProperty: "width",
            transitionDuration: "1.3s",
        },
    };

    return (
        <div style={styles.outterBox}>
            <div style={styles.innerBox}></div>
        </div>
    );
};
export default ProgressBar;
