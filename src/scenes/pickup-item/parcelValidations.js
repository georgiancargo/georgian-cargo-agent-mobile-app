import vest, {validate, test, enforce} from "vest";

const parcelValidations = (data, field) => {
    return validate("AddReciever", () => {
        vest.only(field);

        ["tracking_number", "weight", "description"].forEach((elem) => {
            test(elem, "This field is required", () => {
                enforce(data[elem].toString()).isNotEmpty();
            });
        });
        test("tracking_number", "Must be longer than 3 characters", ()=>{
            enforce(data.tracking_number.toString()).longerThanOrEquals(4);
        });
    });
};

export default parcelValidations;
