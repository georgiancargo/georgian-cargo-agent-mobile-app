import vest, {validate, test, enforce} from "vest";
import {truncate} from "_utils";

const senderDataValidations = (data, field) => {
    return validate("PickupItemScreen", () => {
        vest.only(field);

        [
            "name",
            "email",
            "phone",
            "address_line_1",
            "postal_code",
            "country_code",
        ].forEach((elem) => {
            test(elem, "This field is required", () => {
                if (typeof data[elem] === "undefined") {
                    data[elem] = "";
                }
                enforce(data[elem].toString()).isNotEmpty();
            });
        });

        if (typeof data.email === "undefined") {
            data.email = "";
        }

        const trimmedEmail = truncate(data.email.toString(), 15);
        test("email", trimmedEmail + "is not valid email address", () => {
            enforce(data.email.toString())
                .isNotEmpty()
                .matches(/[^@]+@[^.]+\..+/g);
        });
    });
};

export default senderDataValidations;
