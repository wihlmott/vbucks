import { RouterProvider } from "react-router-dom";
import router from "./utils/router";
import { UserContext } from "./context/context";
import { usePersistUser } from "./hooks/usePersistedState";

function App() {
    const [user, setUser] = usePersistUser("");

    return (
        <UserContext.Provider value={[user, setUser]}>
            <RouterProvider router={router} />
        </UserContext.Provider>
    );
}

export default App;
