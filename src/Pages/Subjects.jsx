import { useEffect, useState } from "react";
import LinkCard from "../Components/LinkCard";
import WelcomeHeader from "../Components/WelcomeHeader";
import { subjects } from "../config";
import Loading from "../Components/Loading";
import { db } from "../database/databases";

const Subjects = () => {
    const [state, setState] = useState({ subjects: [], isLoading: true });

    const init = async () => {
        const response = await db.subjects.list();
        setState(() => {
            return { subjects: response.documents, isLoading: false };
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
