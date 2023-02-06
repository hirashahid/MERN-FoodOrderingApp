import * as Yup from "yup";

export const checkoutSchema = Yup.object({
    name: Yup.string().min(3).max(25).required("Please enter your name"),
    phone: Yup.number().min(11).required("Please enter your phone number"),
    address: Yup.string().min(3).max(25).required("Please enter your address"),
});
