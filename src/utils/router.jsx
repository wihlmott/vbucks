import { createBrowserRouter } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Layout from "../Components/Layout.jsx";
import ProfilePage from "../Pages/ProfilePage.jsx";
import Subjects from "../Pages/Subjects.jsx";
import SubjectIntro from "../Pages/SubjectIntro.jsx";
import Question from "../Pages/Question.jsx";
import LoginPage from "../Pages/LoginPage.jsx";
import Leaderboard from "../Pages/Leaderboard.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoutes>
                <Layout />
            </ProtectedRoutes>
        ),
        children: [
            {
                index: true,
                element: <ProfilePage />,
            },
            {
                path: "/subjects/",
                element: <Subjects />,
            },
            {
                path: "/subjectIntro/",
                element: <SubjectIntro />,
            },
            {
                path: "/leaderboard/",
                element: <Leaderboard />,
            },
        ],
    },
    {
        path: "/question",
        element: <Question />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);

export default router;
