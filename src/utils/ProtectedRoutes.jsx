import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/context";

const ProtectedRoutes = ({ children }) => {
    const [user, _] = useContext(UserContext);

    return user ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;