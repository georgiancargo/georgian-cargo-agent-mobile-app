import {createContext} from "react";

const AuthContext = createContext({
    access_token: null,
    remember_token: null,
    is_logged_in: false,
});

export default AuthContext;
