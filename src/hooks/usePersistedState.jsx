import { useEffect, useReducer, useState } from "react";
import { getFromLocalStorage, setToLocalStorage } from "../utils/localStorage";

export const usePersistedState = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const item = getFromLocalStorage(
            `${key.user}-${key.topic}-${key.value}`
        );
        return item || initialValue;
    });

    useEffect(() => {
        setToLocalStorage(`${key.user}-${key.topic}-${key.value}`, value);
    }, [value]);

    return [value, setValue];
};

export const usePersistUser = (initialValue) => {
    const [value, setValue] = useState(() => {
        const item = getFromLocalStorage("user");
        return item || initialValue;
    });

    useEffect(() => {
        setToLocalStorage("user", value);
    }, [value]);

    return [value, setValue];
};
