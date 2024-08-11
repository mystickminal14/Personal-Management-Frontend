import * as Yup from "yup";

const taskSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  dueDate: Yup.string().required(" Due Date is required"),
  description: Yup.string().required("Description is required!!!"),
  priority: Yup.string().required("Priority is required!!!"),
  status: Yup.array().required("Status is required!!!"),
  
});

export default taskSchema;
