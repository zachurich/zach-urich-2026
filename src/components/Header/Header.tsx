"use client";

import { Menu, Moon, SunDim } from "lucide-react";
import { useTheme } from "@/contexts/Theme/hooks";
import styles from "./header.module.css";
import { Button } from "@/components/Button/Button";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { HomeLink } from "@/components/HomeLink/HomeLink";

type Props = {};

export const Header = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();

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
      <div className={styles.left}>{isMobile && <HomeLink />}</div>
      <div className={styles.right}>
        <Button onClick={theme.toggleTheme} variant="icon">
          {theme.theme === "dark" ? <SunDim size={20} /> : <Moon size={20} />}
        </Button>
        {isMobile && (
          <Button variant="icon">
            <Menu size={20} />
          </Button>
        )}
      </div>
    </header>
  );
};
