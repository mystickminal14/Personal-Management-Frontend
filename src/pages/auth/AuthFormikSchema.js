import * as Yup from "yup";
const authStoreSchema = Yup.object({
  fullName: Yup.string().required("Fullname name is required."),

  gender: Yup.string().required("Gender is required"),
  username: Yup.string().required("Username is required."),
  password: Yup.string().required("Password is required."),
  email: Yup.string().required("Email is required."),
});
const authUpdateSchema = Yup.object({
  fullName: Yup.string().required("Fullname name is required."),

  gender: Yup.string().required("Gender is required"),
  username: Yup.string().required("Username is required."),
  password: Yup.string().required("Password is required."),
  email: Yup.string().required("Email is required."),
});

export { authStoreSchema, authUpdateSchema };
