import Dashboard from "../../../components/dashboard/Dashboard";
import TaskDashboard from "./boards/TaskDashboard";

export default function TaskManagement() {
  return (
    <>
       <Dashboard  mainContent={<TaskDashboard/>}/>
      
      
    </>
  )
}
