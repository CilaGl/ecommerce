import React, { createContext, useCallback, useContext, useState } from "react";

const BreadcrumbContext = createContext(undefined);

export const BreadcrumbProvider = ({ children }) => {
  const [customNames, setCustomNames] = useState({});

  // Usar useCallback para memorizar las funciones
  const setPageName = useCallback((path, name) => {
    setCustomNames((prev) => ({
      ...prev,
      [path]: name,
    }));
  }, []);

  const clearPageName = useCallback((path) => {
    setCustomNames((prev) => {
      const updated = { ...prev };
      delete updated[path];
      return updated;
    });
  }, []);

  const value = { customNames, setPageName, clearPageName };
  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};
