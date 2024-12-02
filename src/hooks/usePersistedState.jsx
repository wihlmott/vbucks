import { useEffect, useState } from "react";
import { getFromLocalStorage, setToLocalStorage } from "../utils/localStorage";

export const usePersistedState = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const item = getFromLocalStorage(`${key.topic}-${key.value}`);
        return item || initialValue;
    });

    useEffect(() => {
        setToLocalStorage(`${key.topic}-${key.value}`, value);

        console.log(`${key.topic}-${key.value}`, value);
    }, [value]);

    return [value, setValue];
};
