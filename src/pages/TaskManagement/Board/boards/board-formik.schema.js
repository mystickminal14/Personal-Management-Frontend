import * as Yup from "yup";

const boardStoreSchema = Yup.object({
  boardName: Yup.string().required("Board Name required"),
  background: Yup.string(),
  description: Yup.string().required("Description is required!!!"),
  startDate: Yup.string().required("Start Date is required!!!"),
  endDate: Yup.string().required("EndDate is required!!!"),
  status: Yup.string().required("Status is required!!!"),
  taskStatus: Yup.array().required("Task Status is required!!!"),
  
});
const boardUpdateSchema = Yup.object({
  boardName: Yup.string().required("Board Name required"),
  background: Yup.string(),
  description: Yup.string().required("Description is required!!!"),
  startDate: Yup.string().required("Start Date is required!!!"),
  endDate: Yup.string().required("EndDate is required!!!"),
  status: Yup.string().required("Status is required!!!"),
 
  
});
export  {boardStoreSchema,boardUpdateSchema};
