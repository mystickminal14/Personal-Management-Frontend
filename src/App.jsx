import "./App.css";
import TaskManagement from './pages/TaskManagement/TaskManagement';
import Dashboard from './components/dashboard/Dashboard';
import Board from "./pages/TaskManagement/Board";
function App() {
  return (
   <>
   
   <Dashboard mainContent={<Board/>}/>
   </>
  );
}

export default App;
