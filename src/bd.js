import { Client, Databases } from "appwrite";

const client = new Client();
client.setProject(import.meta.env.VITE_PROJECT_ID);

const databases = new Databases(client);

export const retreiveQuiz = async (title) => {
    const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID_QUESTIONS
    );

    return response.documents.filter((doc) => doc.quiz_title == title);
};

export const retreiveTopics = async (subject) => {
    const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID_SUBJECTS
    );

    return response.documents.filter((doc) => doc.title == subject)[0];
};

export const retreiveSubjects = async () => {
    const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID_SUBJECTS
    );

    return response.documents;
};

export const retreiveUserToSignIn = async (user) => {
    const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID_USERS
    );

    const allMatches = response.documents.filter(
        (userDB) =>
            userDB.name == user.username.split(" ")[0].toLowerCase() &&
            userDB.surname == user.username.split(" ")[1].toLowerCase()
    );

    return allMatches.filter((match) => match.password === user.password);
};
