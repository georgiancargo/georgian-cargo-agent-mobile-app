export default function loginRequest(axios, data) {
    return axios.post("/cargo/release", data);
}
