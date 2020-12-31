export default function processRequest(axios, data) {
    return axios.post("/cargo/batch/event", data);
}
