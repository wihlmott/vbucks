import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import LinkCard from "../Components/LinkCard";
import { retreiveTopics } from "../bd";
import { useEffect, useState } from "react";
import Loading from "../Components/Loading";

const SubjectIntro = () => {
    const { state: subject } = useLocation();
    const [state, setState] = useState({ topics: [], isLoading: true });

    const init = async () => {
        const response = await retreiveTopics(subject.title);
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
                            // done: topic.completed,
                            // max: topic.questions.length,
                            //personal profile, must be collected at open. will tract how much completed per quiz
                            done: 2,
                            max: 5,
                        }}
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
