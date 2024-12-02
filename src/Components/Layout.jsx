import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <Navbar />
        </>
    );
};

export default Layout;
