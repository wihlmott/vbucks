import Button from "../Components/Button";

const NewQuizPage = () => {
    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={submitHandler} style={{ textAlign: "center" }}>
            <Button text="create new quiz" />
        </form>
    );
};

export default NewQuizPage;
