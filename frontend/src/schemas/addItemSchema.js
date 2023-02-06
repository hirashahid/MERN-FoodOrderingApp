import * as Yup from "yup";

export const addItemSchema = Yup.object({
    name: Yup.string().min(3).required("Please enter name"),
    smallPrice: Yup.number().min(1).required("Please enter small price"),
    mediumPrice: Yup.number().min(1).required("Please enter medium price"),
    largePrice: Yup.number().min(1).required("Please enter large price"),
    image: Yup.string().min(1).required("Please enter image"),
    description: Yup.string().min(1).required("Please enter description"),
});
