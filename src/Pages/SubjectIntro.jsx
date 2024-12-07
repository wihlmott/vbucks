import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import LinkCard from "../Components/LinkCard";
import { Fragment, useContext, useEffect, useState } from "react";
import Loading from "../Components/Loading";
import { db } from "../database/databases";
import { getFromLocalStorage } from "../utils/localStorage";
import { UserContext } from "../context/context";
import LeaderboardButton from "../Components/Leaderboard/LeaderboardButton";
import SortedNames from "../Components/Leaderboard/SortedNames";
import { sortArray } from "../utils/helperFunctions";

const SubjectIntro = () => {
    const { state: subject } = useLocation();
    const [state, setState] = useState({ topics: [], isLoading: true });
    const [leaderboardState, setLeaderboardState] = useState({
        open: false,
        topic: "",
        names: [],
    });
    const [user, _] = useContext(UserContext);
    const [name, surname, a, b, quiz_completed] = user;
    const userID = (name + surname).toLowerCase();

    const init = async () => {
        const response = await db.subjects.get(subject.title);
        setState({ topics: response.quiz_titles, isLoading: false });
    };
    useEffect(() => {
        init();
    }, []);

    const getNames = async () => {
        const response = (await db.users.list()).documents;
        const allUsers = response
            .filter(
                (user) =>
                    user.quiz_completed.filter(
                        (quiz_item) =>
                            quiz_item.split("-")[1] == leaderboardState.topic
                    ).length != 0
            ) //remove users who did not do topic
            .map((user) => {
                return {
                    name: user.name,
                    surname: user.surname,
                    quiz_completed: user.quiz_completed.filter(
                        (quiz_item) =>
                            quiz_item.split("-")[1] == leaderboardState.topic
                    ),
                };
            }); //create array for sort, from db table docs
        const allUsersSorted = sortArray(allUsers);
        setLeaderboardState((prev) => {
            return { ...prev, names: allUsersSorted };
        });
    };
    useEffect(() => {
        getNames();
    }, [leaderboardState.open]);

    const render = () =>
        state.topics.map((topic) => {
            const progress = getFromLocalStorage(`${userID}-${topic}-counter`);
            const full = quiz_completed.find((el) => el.split("-")[1] == topic);

            return (
                <Fragment key={topic}>
                    <LinkCard
                        to="/question"
                        state={{
                            topic: topic,
                            color: subject.color,
                            subject: subject.title,
                        }}
                        title={topic}
                        square
                        shadowColor={subject.color.split(" ")[1]}
                        progressBar={{
                            done: progress ? progress.value : 0,
                            max: progress ? progress.max + 1 : 5,
                        }}
                        progressBarFull={full}
                    />
                    <LeaderboardButton
                        handleClick={() => {
                            setLeaderboardState((prev) => {
                                return {
                                    ...prev,
                                    topic: topic,
                                    open: !prev.open,
                                };
                            });
                        }}
                    />
                    {
                        <div
                            style={{
                                overflow: "hidden",
                                backgroundColor: "rgba(0,0,0,.3)",
                                borderBottomLeftRadius: "8px",
                                borderBottomRightRadius: "8px",
                                boxShadow: "1px 2px 6px rgba(0,0,0,.35)",
                                margin: "-11px 15px 0px 15px",
                                maxHeight:
                                    leaderboardState.open &&
                                    leaderboardState.topic == topic
                                        ? "200px"
                                        : "0",
                                transitionProperty: "max-height",
                                transitionDuration: ".3s",
                            }}
                        >
                            <SortedNames array={leaderboardState.names} mini />
                        </div>
                    }
                </Fragment>
            );
        });

    return (
        <>
            <Header
                title={subject.title}
                color={subject.color}
                message={subject.message}
                shadowColor={subject.color.split(" ")[1]}
                heightFixed
            />
            {state.isLoading ? <Loading /> : render()}
        </>
    );
};

export default SubjectIntro;
