export default function getUser(axios, data) {
    return axios.get("/auth/staff", data);
}
