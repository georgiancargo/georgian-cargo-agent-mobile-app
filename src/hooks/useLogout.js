import {history} from "components/History";
import {AuthContext} from "context";
import {useRequest} from "hooks";
import {useContext} from "react";

const useLogout = () => {
    const {auth, setAuth} = useContext(AuthContext);
    const type = auth.accountType;
    const logoutRequest = (axios) => {
        let url = `/auth/${type}/logout`.toLowerCase();
        return axios.get(url);
    };
    const [_logout] = useRequest(logoutRequest);
    const home = () => {
        if (type === "CLIENT") return "/home";
        else return `/${type}/login`.toLowerCase();
    };
    const logout = () => {
        _logout()
            .then((r) => {
                setAuth({
                    accessToken: null,
                    refreshToken: null,
                    isLoggedIn: false,
                    accountType: null,
                });
                history.push(home());
                // window.location.reload();
            })
            .catch((e) => {});
    };
    return {logout};
};

export default useLogout;
