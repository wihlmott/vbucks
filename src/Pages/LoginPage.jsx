import { useContext, useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Inputs/Input";
import Loading from "../Components/Loading";
import { colors } from "../config";
import { UserContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { db } from "../database/databases";
import { Query } from "appwrite";
import { GrUserAdmin, GrUserExpert } from "react-icons/gr";

const LoginPage = () => {
    const [_, setUser] = useContext(UserContext);
    const [teacherView, setTeacherView] = useState(false);
    const [formState, setFormState] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    let navigate = useNavigate();

    const [isLoading, setIsloading] = useState(false);

    const handleChange = (e) =>
        setFormState((prev) => {
            return { ...prev, [e.placeholder]: e.value };
        });
    const handleViewChange = () => {
        setTeacherView(!teacherView);
        setError("");
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (formState.username.length == 0) {
            setError("username cannot be left blank");
            return;
        }

        if (formState.password.length == 0) {
            setError("password cannot be left blank");
            return;
        }

        setIsloading(true);
        try {
            const user = await db[teacherView ? `teachers` : `users`].list([
                Query.and([
                    Query.equal("name", [
                        `${formState.username.split(" ")[0]}`,
                    ]),
                    Query.equal("surname", [
                        `${formState.username.split(" ")[1]}`,
                    ]),
                ]),
            ]);

            if (user.total == 0) throw `user not found`;
            if (user.documents[0].password != formState.password)
                throw `username and password don't match`;
            if (user.documents[0].password == formState.password) {
                console.log(user);

                teacherView
                    ? setUser(() => [
                          "teacher",
                          user.documents[0].name,
                          user.documents[0].surname,
                      ])
                    : setUser(() => [
                          user.documents[0].name,
                          user.documents[0].surname,
                          user.documents[0].class,
                          user.documents[0].subjects,
                          user.documents[0].quiz_completed,
                          user.documents[0].rewards_used,
                          user.documents[0].alt_quiz_attempts,
                      ]);
                setIsloading(false);
                navigate(teacherView ? "/teacher/newquiz" : "/");
            }
        } catch (err) {
            setError(err);
            setIsloading(false);
        }
    };
    const styles = {
        form: {
            boxSizing: "border-box",
            textAlign: "center",
            width: "300px",
            height: "500px",
            boxShadow: `1px 1px 10px ${colors.grey}`,
            borderRadius: "4px",
            margin: "50px auto",
            paddingTop: "50px",
        },
        title: {
            color: `rgba(${teacherView ? "250" : "0"},0,0,1)`,
            textShadow: `2px 2px 6px ${colors.grey}`,
        },
        errorText: {
            fontSize: "0.8rem",
            color: "red",
            textShadow: "1px 1px 4px rgba(0,0,0,.2)",
        },
        iconSpan: {
            display: "block",

            fontSize: "1.5rem",
            width: "2.1rem",
            padding: "8px",
            margin: "50px auto",
            borderRadius: "50%",
            background: `rgba(${teacherView ? "250" : "0"},0,0,.15)`,
            boxShadow: "0px 0px 6px rgba(0,0,0,.35)",
        },
    };

    return (
        <form style={styles.form} onSubmit={submitHandler}>
            <p style={styles.title}>
                {teacherView ? `teacher` : `learner`} login
            </p>
            <Input
                placeholder={"username"}
                sendValue={handleChange}
                type="text"
                value={formState.username}
            />
            <Input
                placeholder={"password"}
                sendValue={handleChange}
                type="password"
                error={error}
                value={formState.password}
            />
            <Button text="submit" submitHandler={submitHandler} />
            {error && <p style={styles.errorText}>{error}</p>}

            {isLoading && <Loading />}

            <span style={styles.iconSpan} onClick={handleViewChange}>
                {teacherView ? <GrUserAdmin /> : <GrUserExpert />}
            </span>
        </form>
    );
};

export default LoginPage;
