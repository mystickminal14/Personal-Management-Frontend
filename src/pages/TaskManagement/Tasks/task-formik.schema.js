import * as Yup from "yup";

const taskSchema = Yup.object({
  title: Yup.string().required("Board Name required"),
  dueDate: Yup.string().required(" Due Date is required"),
  description: Yup.string().required("Description is required!!!"),
  priority: Yup.string().required("Priority is required!!!"),
  endDate: Yup.string().required("EndDate is required!!!"),
  status: Yup.array().required("Status is required!!!"),
  
});

export default taskSchema;
