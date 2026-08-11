"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MobileNavContext } from "./MobileNavContext";

export const MobileNavProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent the page from scrolling behind the menu while it's open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <MobileNavContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </MobileNavContext.Provider>
  );
};
