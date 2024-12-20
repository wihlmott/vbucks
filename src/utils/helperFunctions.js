export const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return `${day}${month}${year}`;
};

export const sortArray = (array) =>
    array
        .map((user) => {
            return {
                name: user.name,
                surname: user.surname,
                totalPoints: user.quiz_completed.reduce(
                    (acc, curr) =>
                        acc +
                        parseInt(curr.split("-")[curr.split("-").length - 2]),
                    0
                ),
            };
        })
        .sort((a, b) => b.totalPoints - a.totalPoints);
//array must have object in the form name,surname,quiz_completed

export const cleanDocID = (string) =>
    string.trim().replaceAll("-", "_").replaceAll(" ", "_");

export const cleanTitle = (string) =>
    string
        .replaceAll(" ", "")
        .replaceAll(".", "")
        .replaceAll("-", "")
        .toLowerCase();

export const cleanString = (string) =>
    string
        .replaceAll(" ", "")
        .replaceAll(".", "")
        .replaceAll("-", "")
        .replaceAll("_", "")
        .toLowerCase();

export const cleanValue = (string) =>
    string
        .replaceAll(" ", "")
        .replaceAll(".", "")
        .replaceAll("_", "")
        .toLowerCase();

export const removeDuplicates = (array) =>
    array
        .map((title) => {
            return {
                title: title.quiz_title,
                amount: array.filter((el) => el.quiz_title == title.quiz_title)
                    .length,
            };
        })
        .filter(
            (obj1, i, arr) =>
                arr.findIndex((obj2) => obj2.title === obj1.title) === i
        );
