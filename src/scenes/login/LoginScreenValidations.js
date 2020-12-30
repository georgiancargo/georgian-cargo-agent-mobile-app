import vest, {validate, test, enforce} from "vest";

const loginScreenValidations = (data, field) => {
    return validate("LoginScreen", () => {
        vest.only(field);

        ["username", "password"].forEach((elem) => {
            test(elem, "This field is required", () => {
                enforce(data[elem].toString()).isNotEmpty();
            });
        });
    });
};

export default loginScreenValidations;
