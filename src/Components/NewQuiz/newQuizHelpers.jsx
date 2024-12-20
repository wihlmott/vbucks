import { cleanDocID } from "../../utils/helperFunctions";

export const initialNewQuiz = {
    subject: { value: "-- -- -- --", valid: false },
    quizTitle: { value: "", valid: false },
    grades_to_view: { value: "", valid: false },
    type_of_question: { value: "-- -- -- --", valid: false },
    question: { value: "", valid: false },
    answer: { value: "", valid: false },
    options: { value: "", valid: false },
    description: { value: "", valid: false },
};

export const returnPayloadCreateQuestion = (newQuiz, questions) => {
    return {
        question: newQuiz.question.value,
        options:
            newQuiz.options.value == "" ? [] : newQuiz.options.value.split(","),
        description: newQuiz.description.value,
        answer: newQuiz.answer.value.split(","),
        quizTitle: cleanDocID(newQuiz.quizTitle.value),
        subject: newQuiz.subject.value,
        type: questions
            .filter((question) => question.value == "type_of_question")[0]
            .options.filter(
                (option) => option.text == newQuiz.type_of_question.value
            )[0].element,
    };
};

export const returnInvalidFieldsQuiz = (newQuiz) => {
    let arr = [];
    const allBarOptions = Object.entries(newQuiz).filter((input) =>
        newQuiz.type_of_question.value != "multiple choice"
            ? input[0] != "options"
            : true
    );
    allBarOptions.forEach((input) => {
        if (input[1].valid == false) arr.push(input[0]);
    });
    return arr.length == 0 ? null : arr;
};

export const initialFormState = {
    learner_name: { value: null, valid: false },
    learner_password: { value: null, valid: false },
    confirm_password: { value: null, valid: false },
    subjects: { value: [], valid: false },
    class: { value: null, valid: false },
};

export const returnPayloadNewLearner = (formState) => {
    return {
        name: formState.learner_name.value.split(" ")[0],
        surname: formState.learner_name.value.split(" ")[1],
        subjects: formState.subjects.value.split(","),
        password: formState.learner_password.value,
        class: formState.class.value,
    };
};

export const returnInvalidFieldsLearner = (formState) => {
    let arr = [];
    Object.entries(formState).forEach((input) => {
        if (input[1].valid == false) arr.push(input[0]);
    });
    return arr.length == 0 ? null : arr;
};
