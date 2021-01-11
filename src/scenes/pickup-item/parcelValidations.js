import vest, {validate, test, enforce} from "vest";

const parcelValidations = (data, field) => {
    return validate("AddReciever", () => {
        vest.only(field);

        ["tracking_number", "weight", "description"].forEach((elem) => {
            test(elem, "This field is required", () => {
                enforce(data[elem].toString()).isNotEmpty();
            });
        });
    });
};

export default parcelValidations;
