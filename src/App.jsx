import { RouterProvider } from "react-router-dom";
import router from "./utils/router";
import { useState } from "react";
import { UserContext } from "./context/context";

function App() {
    const [user, setUser] = useState();

    return (
        <UserContext.Provider value={[user, setUser]}>
            <RouterProvider router={router} />
        </UserContext.Provider>
    );
}

export default App;
