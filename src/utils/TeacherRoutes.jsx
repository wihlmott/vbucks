import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/context";

const TeacherRoutes = ({ children }) => {
    const [user, _] = useContext(UserContext);

    return user[0] == "teacher" ? children : <Navigate to={"/login"} />;
};

export default TeacherRoutes;
