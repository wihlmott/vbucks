import { useContext, useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Loading from "../Components/Loading";
import { colors } from "../config";
import { UserContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { db } from "../database/databases";
import { Query } from "appwrite";

const LoginPage = () => {
    const [_, setUser] = useContext(UserContext);
    const [formState, setFormState] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    let navigate = useNavigate();

    const [isLoading, setIsloading] = useState(false);

    const handleChange = (e) =>
        setFormState((prev) => {
            return { ...prev, [e.placeholder]: e.value };
        });

    const submitHandler = async (e) => {
        e.preventDefault();

        if (formState.password.length == 0) {
            setError("password cannot be left blank");
            return;
        }

        setIsloading(true);
        try {
            const user = await db.users.list([
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
                setUser(() => [
                    user.documents[0].name,
                    user.documents[0].surname,
                    user.documents[0].class,
                    user.documents[0].subject_points,
                    user.documents[0].quiz_completed,
                ]);
                setIsloading(false);
                navigate("/");
            }
        } catch (err) {
            setError(err);
            setIsloading(false);
        }
    };

    return (
        <form style={styles.form} onSubmit={submitHandler}>
            <p>login</p>
            <Input
                placeholder={"username"}
                sendValue={handleChange}
                type="text"
            />
            <Input
                placeholder={"password"}
                sendValue={handleChange}
                type="password"
                error={error}
            />
            <Button text="submit" submitHandler={submitHandler} />
            {error && <p style={styles.errorText}>{error}</p>}

            {isLoading && <Loading />}
        </form>
    );
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
    errorText: {
        fontSize: "0.8rem",
        color: "red",
        textShadow: "1px 1px 4px rgba(0,0,0,.2)",
    },
};

export default LoginPage;
