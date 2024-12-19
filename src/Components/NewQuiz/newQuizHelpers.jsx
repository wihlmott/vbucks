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
        quizTitle: newQuiz.quizTitle.value,
        subject: newQuiz.subject.value,
        type: questions
            .filter((question) => question.value == "type_of_question")[0]
            .options.filter(
                (option) => option.text == newQuiz.type_of_question.value
            )[0].element,
    };
};

export const returnInvalidFields = (newQuiz) => {
    let arr = [];
    const allBarOptions = Object.entries(newQuiz).filter((input) =>
        newQuiz.type_of_question.value != "multiple choice"
            ? input[0] != "options"
            : true
    );
    allBarOptions.forEach((input) => {
        if (input[1].valid == false) arr.push(input[0]);
    });
    return arr;
};
