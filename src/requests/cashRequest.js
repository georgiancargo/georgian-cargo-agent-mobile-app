export default function cashRequest(axios, data) {
    return axios.post("/billing/payment/cash", data);
}
