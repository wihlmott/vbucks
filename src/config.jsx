import { BiMath } from "react-icons/bi";
import { SlChemistry } from "react-icons/sl";
import { FcReading } from "react-icons/fc";
import { IoHome } from "react-icons/io5";
import { GiChemicalDrop, GiNotebook, GiPencilRuler } from "react-icons/gi";
import { TbMathIntegralX, TbScoreboard } from "react-icons/tb";
import { PiNotepadBold } from "react-icons/pi";
import homeworkIMG from "./assets/Images/homework.png";
import musicIMG from "./assets/Images/mp3-player.png";
import freetimeIMG from "./assets/Images/freetime.png";
import teamworkIMG from "./assets/Images/teamwork.png";
import { FaUserPlus } from "react-icons/fa";

export const colors = {
    grey: "rgba(0, 0, 0, 0.3)",
    gradients: [
        "linear-gradient(180deg, rgba(41,90,127,1) 0%, rgba(110,159,193,1) 100%)",
        "linear-gradient(180deg, rgba(2,50,36,1) 0%, rgba(245,0,181,1) 100%)",
        "linear-gradient(180deg, rgba(198,119,0,1) 0%, rgba(252,255,158,1) 100%)",
        "linear-gradient(180deg, rgb(12, 101, 4)0%,rgb(196, 224, 9)100%)",
        "linear-gradient(180deg,rgb(145, 25, 4) 0%,rgb(248, 119, 26) 100%)",
        "linear-gradient(180deg,rgb(207, 22, 253) 0%,rgb(103, 21, 74) 100%)",
    ],
    get textShadowHeading() {
        return `2px 1.5px 2px ${this.grey}`;
    },
};

export const themeColor = {
    gradient: colors.gradients[0],
    color: colors.gradients[0].split(" ")[1],
};

export const subjects = {
    mathematics: { icon: <BiMath />, color: colors.gradients[0] },
    science: { icon: <SlChemistry />, color: colors.gradients[1] },
    english: { icon: <FcReading />, color: colors.gradients[2] },
    EGD: { icon: <GiPencilRuler />, color: colors.gradients[3] },
    technical_mathematics: {
        icon: <TbMathIntegralX />,
        color: colors.gradients[4],
    },
    technical_science: { icon: <GiChemicalDrop />, color: colors.gradients[5] },
};

export const navBarIcons = [
    { link: "./", icon: <IoHome /> },
    { link: "./subjects", icon: <GiNotebook /> },
    { link: "./leaderboard", icon: <TbScoreboard /> },
];

export const teacherNavBarIcons = [
    { link: "/teacher/newquiz", icon: <PiNotepadBold /> },
    { link: "/teacher/newlearner", icon: <FaUserPlus /> },
];

export const rewards = [
    { value: "reward1", img: homeworkIMG, id: "homework" },
    { value: "reward2", img: musicIMG, id: "music" },
    { value: "reward3", img: freetimeIMG, id: "freetime" },
    { value: "reward4", img: teamworkIMG, id: "teamwork" },
];

export const newLearnerQuestions = [
    { value: "learner_name", type: "input" },
    { value: "learner_password", type: "input", password: true },
    { value: "confirm_password", type: "input", password: true },
    {
        value: "subjects",
        type: "input",
        message: "seperate values with comma(,)",
    },
    { value: "class", type: "input" },
];

export const newQuizQuestions = [
    {
        value: "subject",
        type: "dropdown",
        options: [
            { text: "mathematics", element: "mathematics" },
            { text: "english", element: "english" },
            { text: "science", element: "science" },
            { text: "EGD", element: "egd" },
            { text: "technical mathematics", element: "technical_mathematics" },
            { text: "technical science", element: "technical_science" },
        ],
    },
    {
        value: "quizTitle",
        type: "find_input",
        message: "if new, must be unique. eg. algebra_q1",
    },
    {
        value: "grades_to_view",
        type: "input",
        message: "only write number, split values with a comma(,)",
    },
    {
        value: "type_of_question",
        type: "dropdown",
        options: [
            { text: "multiple choice", element: "multiple_choice" },
            { text: "input two equation", element: "input_doubleBoxes" },
            { text: "input one equation", element: "input_singleBoxes" },
            { text: "word or phrase", element: "input_string" },
        ],
    },
    { value: "question", type: "input" },
    {
        value: "answer",
        type: "input",
        message: "seperate multiple answers with a comma(,)",
    },
    {
        value: "options",
        type: "input",
        message: "seperate multiple options with a comma(,)",
    },
    {
        value: "description",
        type: "long_input",
    },
];
