import * as Yup from "yup";

export const categorySchema = Yup.object({
    name: Yup.string().min(3).required("Please enter name"),
});
