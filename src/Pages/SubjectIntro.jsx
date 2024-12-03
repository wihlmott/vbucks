import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import LinkCard from "../Components/LinkCard";
import { useContext, useEffect, useState } from "react";
import Loading from "../Components/Loading";
import { db } from "../database/databases";
import { getFromLocalStorage } from "../utils/localStorage";
import { UserContext } from "../context/context";

const SubjectIntro = () => {
    const { state: subject } = useLocation();
    const [state, setState] = useState({ topics: [], isLoading: true });
    const [user, _] = useContext(UserContext);
    const [name, surname, a, b, quiz_completed] = user;
    const userID = name + surname;

    const init = async () => {
        const response = await db.subjects.get(subject.title);
        setState({ topics: response.quiz_titles, isLoading: false });
    };

    useEffect(() => {
        init();
    }, []);

    const render = () => {
        return state.isLoading ? (
            <Loading />
        ) : (
            state.topics.map((topic) => {
                const progress = getFromLocalStorage(
                    `${userID}-${topic}-counter`
                );
                const full = quiz_completed.find(
                    (el) => el.split("-")[0] == topic
                );

                return (
                    <LinkCard
                        key={topic}
                        to="/question"
                        state={{
                            topic: topic,
                            color: subject.color,
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
                );
            })
        );
    };

    return (
        <>
            <Header
                title={subject.title}
                color={subject.color}
                message={subject.message}
                shadowColor={subject.color.split(" ")[1]}
                heightFixed
            />
            {render()}
        </>
    );
};

export default SubjectIntro;
