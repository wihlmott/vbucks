import { databases, ID } from "./appwrite.js";

const db = {};

const collections = [
    {
        dbID: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_QUESTIONS,
        name: "questions",
    },
    {
        dbID: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_SUBJECTS,
        name: "subjects",
    },
    {
        dbID: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_USERS,
        name: "users",
    },
    {
        dbID: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_TEACHERS,
        name: "teachers",
    },
];

collections.forEach((col) => {
    db[col.name] = {
        create: (payload) =>
            databases.createDocument(col.dbID, col.id, ID.unique(), payload),
        update: (id, payload) =>
            databases.updateDocument(col.dbID, col.id, id, payload),
        list: (queries = []) =>
            databases.listDocuments(col.dbID, col.id, queries),
        get: (id) => databases.getDocument(col.dbID, col.id, id),
    };
});

export { db };
