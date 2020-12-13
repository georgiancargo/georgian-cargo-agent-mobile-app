import {useState} from "react";
import {useCookies} from "react-cookie";
import moment from "moment";

const useAuthentication = (defaultAuth) => {
    const [auth, setAuth] = useState(defaultAuth);
    const [, setCookie] = useCookies([
        "accessToken",
        "refreshToken",
        "isLoggedIn",
        "accountType",
    ]);
    const persistent_cookies = ["refreshToken"];

    const setAuthCookies = (data) => {
        let config = {
            path: "/",
        };
        for (const key in data) {
            if (persistent_cookies.includes(key)) {
                config.expires = moment().add(30, "days").toDate();
            }
            setCookie(key, data[key], config);
        }
        setAuth(data);
    };
    return {auth, setAuth: setAuthCookies};
};

export default useAuthentication;
