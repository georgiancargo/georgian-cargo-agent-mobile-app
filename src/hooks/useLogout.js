import {AuthContext} from "_context";
import {useRequest} from "./useRequest";
import {useContext} from "react";
import {deleteItemAsync as _delete} from "expo-secure-store";

const useLogout = () => {
    const {setAuth} = useContext(AuthContext);
    const logoutRequest = (axios) => {
        let url = `/auth/agent/logout`.toLowerCase();
        return axios.get(url);
    };
    const [_logout] = useRequest(logoutRequest);
    
    const logout = () => {
        _logout()
            .then((r) => {
                setAuth({
                    accessToken: null,
                    refreshToken: null,
                    isLoggedIn: false,
                });
            })
            .catch((e) => {});
    };
    return {logout};
};

export default useLogout;
