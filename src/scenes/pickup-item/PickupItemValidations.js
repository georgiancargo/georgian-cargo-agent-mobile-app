import vest, {validate, test, enforce} from "vest";
import {truncate} from "_utils";

const pickupItemValidations = (data, field) => {
    return validate("PickupItemScreen", () => {
        vest.only(field);

        [
            "name",
            "email",
            "password",
            "passwordConfirm",
            "mobile",
            "national_personal_number",
        ].forEach((elem) => {
            test(elem, "This field is required", () => {
                enforce(data[elem].toString()).isNotEmpty();
            });
        });

        const trimmedEmail = truncate(data.email.toString(), 15);
        test("email", trimmedEmail + "is not valid email address", () => {
            enforce(data.email.toString())
                .isNotEmpty()
                .matches(/[^@]+@[^.]+\..+/g);
        });

        test(
            "citizenship",
            formatMessage({
                id: "select_account_type",
                defaultMessage: "Please select an account citizenship",
            }),
            () => {
                enforce(data.citizenship !== null).isTruthy();
            }
        );
        test(
            "password",
            formatMessage({
                id: "password_min_length",
                defaultMessage: "Password should be atleast 8 characters long",
            }),
            () => {
                enforce(data.password.toString()).longerThanOrEquals(8);
            }
        );
        // test("mobile", data.mobile + "is not valid phone number", () => {
        //     enforce(parseInt(data.mobile)).isNumeric();
        // });
    });
};

export default pickupItemValidations;
