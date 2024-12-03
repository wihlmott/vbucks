import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { GiNotebook } from "react-icons/gi";
import ConfirmModal from "../ConfirmModal";
import { useContext, useState } from "react";
import { UserContext } from "../../context/context";

const Navbar = () => {
    const [logoutModal, setLogoutModal] = useState(false);
    const [_, setUser] = useContext(UserContext);

    const handleClick = (e) => {
        e == "cancel" && handleLogout();
        e == "confirm" && setUser("");
    };
    const handleLogout = () => setLogoutModal(!logoutModal);

    return (
        <div style={styles.navbar}>
            <Link to="./">
                <IoHome style={{ ...styles.icon, marginLeft: "80px" }} />
            </Link>
            <Link to="./subjects">
                <GiNotebook style={styles.icon} />
            </Link>
            <LuLogIn
                style={{ ...styles.icon, float: "right" }}
                onClick={handleLogout}
            />
            {logoutModal && (
                <ConfirmModal
                    title={`Sign out`}
                    message={`you are about to logout`}
                    sendClick={handleClick}
                />
            )}
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
