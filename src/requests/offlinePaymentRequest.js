export default function offlinePaymentRequest(payment_method) {
    switch (payment_method) {
        case "ONLINE":
            return {
                url: "/billing/payment/method/stripe",
                method: "POST",
            };
        case "CASH":
            return {
                url: "/billing/payment/cash",
                method: "POST",
            };
        case "BANK":
            return {
                url: "/billing/payment/bank",
                method: "POST",
            };
        case "CARD":
            return {
                url: "/billing/payment/card",
                method: "POST",
            };
        default:
            break;
    }
}
