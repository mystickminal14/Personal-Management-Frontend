import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Outlet } from "@mui/icons-material";

function App() {
  return (
    <>
      <AppRoutes /> <Outlet />
    </>
  );
}

export default App;
