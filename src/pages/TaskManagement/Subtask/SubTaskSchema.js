import * as Yup from "yup";

const subTaskStoreSchema = Yup.object({
    title: Yup.string().required("subTask Name required"),

  description: Yup.string().required("Description is required!!!"),

  dueDate: Yup.string().required("EndDate is required!!!"),
  status: Yup.string().required("Status is required!!!"),
 
  
});
const subTaskUpdateSchema = Yup.object({
    title: Yup.string().required("subTask Name required"),

    description: Yup.string().required("Description is required!!!"),
  
    dueDate: Yup.string().required("EndDate is required!!!"),
    status: Yup.string().required("Status is required!!!"),
 
  
});
export  {subTaskStoreSchema,subTaskUpdateSchema};
