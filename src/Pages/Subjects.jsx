import { useContext, useEffect, useState } from "react";
import LinkCard from "../Components/LinkCard";
import WelcomeHeader from "../Components/WelcomeHeader";
import { subjects } from "../config";
import Loading from "../Components/Loading";
import { db } from "../database/databases";
import { UserContext } from "../context/context";
import { Query } from "appwrite";

const Subjects = () => {
    const [user, _] = useContext(UserContext);
    const [a, b, c, userSubjects] = user;
    const userGrade = c.split(/[a-z]/)[0];

    const [state, setState] = useState({ subjects: [], isLoading: true });

    const init = async () => {
        const response = (
            await db.subjects.list([Query.equal("title", userSubjects)])
        ).documents;

        setState(() => {
            return { subjects: response, isLoading: false };
        });
    };
    useEffect(() => {
        init();
    }, []);

    const render = () => (
        <>
            {state.subjects.map((subject) => {
                const { title, quiz_titles } = subject;

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
                        icon={subjects[`${title}`].icon}
                    />
                );
            })}
        </>
    );

    return (
        <>
            <WelcomeHeader message={"Let's get started with today's quiz..."} />
            {state.isLoading && <Loading />}
            {!state.isLoading && render()}
        </>
    );
};

export default Subjects;
