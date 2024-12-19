import TitledDropdown from "./TitledDropdown";
import TitledInput from "./TitledInput";

export const render = (type, el, newQuiz, setNewQuiz, userID, returnSearch) => {
    switch (type) {
        case "input":
            return (
                <TitledInput
                    key={el.value}
                    title={el.value}
                    message={el.message}
                    value={newQuiz[`${el.value}`].value}
                    sendValue={(e) => {
                        setNewQuiz((prev) => ({
                            ...prev,
                            [`${el.value}`]: {
                                value: e.value,
                                valid: e.value.length > 0,
                            },
                        }));
                    }}
                />
            );
        case "long_input":
            return (
                <TitledInput
                    key={el.value}
                    title={el.value}
                    message={el.message}
                    value={newQuiz[`${el.value}`].value}
                    long
                    sendValue={(e) => {
                        setNewQuiz((prev) => ({
                            ...prev,
                            [`${el.value}`]: {
                                value: e.value,
                                valid: e.value.length > 0,
                            },
                        }));
                    }}
                />
            );
        case "find_input":
            return (
                <TitledInput
                    key={el.value}
                    title={el.value}
                    message={el.message}
                    value={newQuiz[`${el.value}`].value}
                    find
                    returnSearch={returnSearch}
                    sendValue={(e) =>
                        setNewQuiz((prev) => ({
                            ...prev,
                            [`${el.value}`]: {
                                value: e.value,
                                valid: e.value.length > 0,
                            },
                        }))
                    }
                />
            );
        case "dropdown":
            return (
                <TitledDropdown
                    key={el.value}
                    title={el.value}
                    value={el.options}
                    selectedValue={newQuiz[el.value].value}
                    userID={userID}
                    sendValue={(e) =>
                        setNewQuiz((prev) => ({
                            ...prev,
                            [`${el.value}`]: {
                                value: e,
                                valid: e.length > 0,
                            },
                        }))
                    }
                />
            );
        default:
            break;
    }
};
