import {useContext, useState, useEffect} from "react";
import Axios from "axios";
import {AuthContext} from "_context";

export default function useAxios() {
    const {auth} = useContext(AuthContext);
    const {accessToken} = {...auth};

    const baseURL = "";

    const defaultAxios = Axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const [axios, setAxios] = useState({instance: defaultAxios});
    useEffect(() => {
        setAxios({
            instance: Axios.create({
                baseURL,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        });
    }, [accessToken]);

    return axios.instance;
}
