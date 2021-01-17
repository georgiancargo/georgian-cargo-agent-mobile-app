import vest, {validate, test, enforce} from "vest";

const parcelValidations = (data, field) => {
    return validate("AddReciever", () => {
        vest.only(field);

        ["tracking_number", "price", "currency_code", "description"].forEach(
            (elem) => {
                test(elem, "This field is required", () => {
                    enforce(
                        data[elem] ? data[elem].toString() : data[elem]
                    ).isNotEmpty();
                });
            }
        );
        test("tracking_number", "Must be longer than 3 characters", () => {
            enforce(data.tracking_number.toString()).longerThanOrEquals(4);
        });
        test("currency_code", "Must be exactly 3 characters", () => {
            enforce(data.currency_code.toString().length).equals(3);
        });
        test("currency_code", "Must be all capitalized characters", () => {
            enforce(data.currency_code.toString()).matches(/^[A-Z]{3}$/g);
        });
    });
};

export default parcelValidations;
