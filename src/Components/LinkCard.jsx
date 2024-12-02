import { Link } from "react-router-dom";
import Card from "./Card";

const LinkCard = ({
    to,
    state = false,
    height = "auto",
    backgroundColor = false,
    shadowColor = false,
    centerText = false,
    square = false,
    onClick = () => {},
    title = false,
    message = false,
    value = false,
    icon = false,
    progressBar = false,
}) => {
    return (
        <Link to={to} state={state} style={{ textDecoration: "none" }}>
            <Card
                height={height}
                backgroundColor={backgroundColor}
                shadowColor={shadowColor}
                centerText={centerText}
                onClick={onClick}
                title={title}
                message={message}
                value={value}
                square={square}
                icon={icon}
                progressBar={progressBar}
            />
        </Link>
    );
};

export default LinkCard;
