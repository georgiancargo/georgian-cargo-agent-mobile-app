export default function paymentRequest(axios, data) {
    const payload = {invoice_ids: invoice.invoice_id};
    switch (data.payment_method) {
        case "ONLINE":
            return axios.post("/billing/payment/method/stripe", payload);
        case "CASH":
            return axios.post("/billing/payment/cash", payload);
        case "BANK":
            return axios.post("/billing/payment/bank", payload);
        default:
            break;
    }
}
