import { Outlet } from "react-router-dom";
import TeacherNavbar from "../Navbar/TeacherNavbar";

const TeacherLayout = () => {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <TeacherNavbar />
        </>
    );
};

export default TeacherLayout;
