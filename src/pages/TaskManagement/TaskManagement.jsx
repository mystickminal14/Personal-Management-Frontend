import Dashboard from "../../components/dashboard/Dashboard";
import Board from "../../components/task-components/Board";
import TaskDashboard from "./TaskDashboard";
export default function TaskManagement() {
  return (
    <>
       <Dashboard mainContent={<Board card={<TaskDashboard/>}/>}/>
      
      
    </>
  )
}
