import {createContext} from "react";

const AuthContext = createContext({
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
});

export default AuthContext;
