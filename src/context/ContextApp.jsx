import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Ensure you have the CSS imported

export const AppContext = createContext();

const ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored"
};

export default function ContextApp({ children }) {
  const [responsive, setResponsive] = useState(true);

  const showToast = (message, type = 'default') => {
    switch (type) {
      case 'warn':
        toast.warn(message, ToastOptions);
        break;
      case 'success':
        toast.success(message, ToastOptions);
        break;
      case 'error':
        toast.error(message, ToastOptions);
        break;
      case 'info':
        toast.info(message, ToastOptions);
        break;
      default:
        toast(message, ToastOptions);
        break;
    }
  };

  return (
    <AppContext.Provider value={{ responsive, showToast, setResponsive }}>
      <ToastContainer />
      {children}
    </AppContext.Provider>
  );
}
