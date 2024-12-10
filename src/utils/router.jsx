import { createBrowserRouter } from "react-router-dom";

import LearnerRoutes from "./LearnerRoutes.jsx";
import TeacherRoutes from "./TeacherRoutes.jsx";
import Layout from "../Components/Layouts/Layout.jsx";
import ProfilePage from "../Pages/ProfilePage.jsx";
import Subjects from "../Pages/Subjects.jsx";
import SubjectIntro from "../Pages/SubjectIntro.jsx";
import QuestionPage from "../Pages/QuestionPage.jsx";
import LoginPage from "../Pages/LoginPage.jsx";
import Leaderboard from "../Pages/Leaderboard.jsx";
import TeacherLayout from "../Components/Layouts/TeacherLayout.jsx";
import NewQuizPage from "../Pages/NewQuizPage.jsx";
import NewLearnerPage from "../Pages/NewLearnerPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <LearnerRoutes>
                <Layout />
            </LearnerRoutes>
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
        element: <QuestionPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: (
            <TeacherRoutes>
                <TeacherLayout />
            </TeacherRoutes>
        ),
        children: [
            { path: "/teacher/newquiz", element: <NewQuizPage /> },
            { path: "/teacher/newlearner", element: <NewLearnerPage /> },
        ],
    },
]);

export default router;
