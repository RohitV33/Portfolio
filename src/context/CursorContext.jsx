import { createContext, useContext, useState, useCallback } from "react";

const CursorContext = createContext(null);

export function CursorProvider({ children }) {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default"); // default | button | project | link
  const [magneticTarget, setMagneticTarget] = useState(null); // { x, y } for magnetic pull

  const setCursor = useCallback((text = "", variant = "default") => {
    setCursorText(text);
    setCursorVariant(variant);
  }, []);

  const setMagnetic = useCallback((target) => {
    setMagneticTarget(target);
  }, []);

  return (
    <CursorContext.Provider
      value={{
        cursorText,
        cursorVariant,
        setCursor,
        magneticTarget,
        setMagnetic,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) return {};
  return ctx;
}
