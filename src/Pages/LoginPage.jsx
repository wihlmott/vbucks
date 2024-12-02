import { useContext, useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Loading from "../Components/Loading";
import { colors } from "../config";
import { retreiveUserToSignIn } from "../bd";
import { UserContext } from "../context/context";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [_, setUser] = useContext(UserContext);
    const [formState, setFormState] = useState({ username: "", password: "" });
    let navigate = useNavigate();

    const [isLoading, setIsloading] = useState(false);

    const handleChange = (e) =>
        setFormState((prev) => {
            return { ...prev, [e.placeholder]: e.value };
        });

    const submitHandler = async (e) => {
        e.preventDefault();

        setIsloading(true);
        try {
            const user = await retreiveUserToSignIn(formState);
            setUser(() => [
                user[0].name,
                user[0].surname,
                user[0].class,
                user[0].subject_points,
            ]);
            setIsloading(false);
            navigate("/");
        } catch (error) {
            console.error(error);
            setIsloading(false);
        }
    };

    return (
        <form
            style={{
                boxSizing: "border-box",
                textAlign: "center",
                width: "300px",
                height: "500px",
                boxShadow: `1px 1px 10px ${colors.grey}`,
                borderRadius: "4px",
                margin: "50px auto",
                paddingTop: "50px",
            }}
            onSubmit={submitHandler}
        >
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
            />
            <Button text="submit" submitHandler={submitHandler} />

            {isLoading && <Loading />}
        </form>
    );
};

export default LoginPage;
