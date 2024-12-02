import { useEffect, useState } from "react";
import { retreiveSubjects } from "../bd";
import LinkCard from "../Components/LinkCard";
import WelcomeHeader from "../Components/WelcomeHeader";
import { subjects } from "../config";
import Loading from "../Components/Loading";

const Subjects = () => {
    const [state, setState] = useState({ subjects: [], isLoading: true });

    const init = async () => {
        const response = await retreiveSubjects();
        setState(() => {
            return { subjects: response, isLoading: false };
        });
    };
    useEffect(() => {
        init();
    }, []);

    const render = () => {
        return state.isLoading ? (
            <Loading />
        ) : (
            <>
                {state.subjects.map((el) => {
                    const { title, topics } = el;

                    return (
                        <LinkCard
                            key={title}
                            to="../subjectIntro"
                            state={{
                                title: title,
                                color: subjects[`${title}`].color,
                                topics: topics,
                            }}
                            title={title}
                            height="76px"
                            backgroundColor={subjects[`${title}`].color}
                            value={"10"}
                            icon={subjects[`${title}`].icon}
                        />
                    );
                })}
            </>
        );
    };

    return (
        <>
            <WelcomeHeader message={"Let's get started with today's quiz..."} />
            {render()}
        </>
    );
};

export default Subjects;
