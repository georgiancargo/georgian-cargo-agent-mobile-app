import vest, {validate, test, enforce} from "vest";

const EditParcelValidations = (data, field) => {
    return validate("EditUser", () => {
        vest.only(field);

        [
            "tracking_number",
            "weight",
            // "source_country_code",
            // "destination_country_code",
            // "collection_option", //Radio button
            // "customer_type", //Radio button
            // "parcel_type", //Dropdown
            // "notes",
            "description",
            "currency_code",
            "freight_price",
            "delivery_price",
            "item_price",
            "item_currency_code",    
        ].forEach((elem) => {
            test(elem, "This field is required", () => {
                enforce(data[elem].toString()).isNotEmpty();
            });
        });
    });
};

export default EditParcelValidations;
