import { RouterProvider } from "react-router-dom";
import router from "./utils/router";
import { UserContext } from "./context/context";
import { usePersistUser } from "./hooks/usePersistedState";
import { MathJaxContext } from "better-react-mathjax";

function App() {
    const [user, setUser] = usePersistUser("");

    return (
        <UserContext.Provider value={[user, setUser]}>
            <MathJaxContext>
                <RouterProvider router={router} />
            </MathJaxContext>
        </UserContext.Provider>
    );
}

export default App;
