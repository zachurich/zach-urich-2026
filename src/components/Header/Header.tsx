"use client";

import { Moon, SunDim } from "lucide-react";
import { useTheme } from "../../contexts/Theme/hooks";
import styles from "./header.module.css";
import { Button } from "../Button/Button";
import { useEffect } from "react";

type Props = {};

export const Header = () => {
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(`.${styles.header}`);
      if (window.scrollY > 0) {
        header?.classList.add(styles.scrolled);
      } else {
        header?.classList.remove(styles.scrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.left}></div>
      <Button onClick={theme.toggleTheme} variant="icon">
        {theme.theme === "dark" ? <SunDim /> : <Moon />}
      </Button>
    </header>
  );
};
