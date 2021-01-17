export default function uploadInvoiceRequest(axios, data) {
    const {invoice_id, invoice} = data;
    var photo = {uri: invoice, name:  'test.png', type:'image/png'};
    var body = new FormData();
    body.append("invoice", photo);
    return axios.post(`/cargo/invoice/upload/${invoice_id}`, body,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
}
