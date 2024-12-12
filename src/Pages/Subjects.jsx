import { useEffect, useState } from "react";
import LinkCard from "../Components/LinkCard";
import WelcomeHeader from "../Components/WelcomeHeader";
import { subjects } from "../config";
import Loading from "../Components/Loading";
import { db } from "../database/databases";

const Subjects = () => {
    const [state, setState] = useState({ subjects: [], isLoading: true });

    const init = async () => {
        //add query for only this learners subjects -- eventually class as well
        const response = (await db.subjects.list()).documents;
        setState(() => {
            return { subjects: response, isLoading: false };
        });
    };
    useEffect(() => {
        init();
    }, []);

    const render = () => {
        return (
            <>
                {state.subjects.map((subject) => {
                    const { title, quiz_titles } = subject;

                    console.log(state.subjects);
                    console.log(subject);

                    return (
                        <LinkCard
                            key={title}
                            to="../subjectIntro"
                            state={{
                                title: title,
                                color: subjects[`${title}`].color,
                                topics: quiz_titles,
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
            {state.isLoading && <Loading />}
            {!state.isLoading && render()}
        </>
    );
};

export default Subjects;
