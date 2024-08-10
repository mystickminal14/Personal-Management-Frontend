import React, { createContext, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();

const ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export default function ContextApp({ children }) {
  const [responsive, setResponsive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefreshData] = useState(false);
  const [openModel, setModel] = useState(false);

  const showToast = (message, type = "default") => {
    switch (type) {
      case "warn":
        toast.warn(message, ToastOptions);
        break;
      case "success":
        toast.success(message, ToastOptions);
        break;
      case "error":
        toast.error(message, ToastOptions);
        break;
      case "info":
        toast.info(message, ToastOptions);
        break;
      default:
        toast(message, ToastOptions);
        break;
    }
  };

  const handleClose = () => {
    setIsLoading(false);
  };

  return (
    <AppContext.Provider value={{ responsive, isLoading, refresh, setRefreshData, setIsLoading, showToast, openModel, setModel, setResponsive }}>
      <ToastContainer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </AppContext.Provider>
  );
}
