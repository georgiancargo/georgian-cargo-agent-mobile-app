export default function bankRequest(axios, data) {
    return axios.post("/billing/payment/bank", data);
}
