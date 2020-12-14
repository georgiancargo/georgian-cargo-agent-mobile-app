export function loginRequest(axios, data) {
    return axios.post("/admin/login", data);
}
