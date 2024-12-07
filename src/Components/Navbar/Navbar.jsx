import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { LuLogIn } from "react-icons/lu";
import ConfirmModal from "../ConfirmModal";
import { UserContext } from "../../context/context";
import { navBarIcons } from "../../config";

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
            <div style={styles.iconContainer}>
                {navBarIcons.map((icon) => (
                    <Link key={icon.link} to={icon.link} style={styles.icon}>
                        {icon.icon}
                    </Link>
                ))}
            </div>

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
        position: "fixed",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0)",
        width: "100vw",
        height: "60px",
        zIndex: "5",
        textAlign: "center",
    },
    iconContainer: {
        position: "absolute",
        display: "inline",
        transform: "translateX(-50%)",
        padding: "8px",
    },
    icon: { fontSize: "2.5rem", margin: "12px 8px", color: "black" },
};

export default Navbar;
