import { createContext } from "react";

export interface MobileNavContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

export const MobileNavContext = createContext<MobileNavContextType | undefined>(
  undefined,
);
