import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { GiNotebook } from "react-icons/gi";

const Navbar = () => {
    return (
        <div style={styles.navbar}>
            <Link to="./">
                <IoHome style={{ ...styles.icon, marginLeft: "80px" }} />
            </Link>
            <Link to="./subjects">
                <GiNotebook style={styles.icon} />
            </Link>
            <Link to="./login">
                <LuLogIn style={{ ...styles.icon, float: "right" }} />
            </Link>
        </div>
    );
};

const styles = {
    navbar: {
        position: "absolute",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0)",
        width: "100vw",
        height: "60px",
        textAlign: "center",
        zIndex: "5",
    },
    icon: { fontSize: "2.5rem", margin: "12px 8px", color: "black" },
};

export default Navbar;
