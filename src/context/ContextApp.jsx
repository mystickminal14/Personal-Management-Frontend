import { createContext, useState } from "react";

export const AppContext = createContext();

export default function ContextApp({ children }) {
  const [responsive, setResponsive] = useState(true);

  return (
    <AppContext.Provider value={{ responsive, setResponsive }}>
      {children}
    </AppContext.Provider>
  );
}
