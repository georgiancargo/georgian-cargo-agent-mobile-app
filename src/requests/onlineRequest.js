export default function onlineRequest(axios, data) {
    return axios.post("/billing/payment/method/stripe", data);
}
