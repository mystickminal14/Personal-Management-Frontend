import * as Yup from "yup";

const boardSchema = Yup.object({
  boardName: Yup.string().required("Board Name required"),
  background: Yup.string(),
  description: Yup.string().required("Description is required!!!"),
  startDate: Yup.string().required("Start Date is required!!!"),
  endDate: Yup.string().required("EndDate is required!!!"),
  status: Yup.string().required("Status is required!!!"),
  
});

export default boardSchema;
