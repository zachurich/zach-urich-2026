"use client";

import { Menu, Moon, SunDim, X } from "lucide-react";
import { useTheme } from "@/contexts/Theme/hooks";
import styles from "./header.module.css";
import { Button } from "@/components/Button/Button";
import { useEffect } from "react";
import { HomeLink } from "@/components/HomeLink/HomeLink";
import { useMobileNav } from "@/contexts/MobileNav/hooks";

export const Header = () => {
  const theme = useTheme();
  const mobileNav = useMobileNav();

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
      <div className={styles.left}>
        <div className={styles.mobileHomeLink}>
          <HomeLink />
        </div>
      </div>
      <div className={styles.right}>
        <Button onClick={theme.toggleTheme} variant="icon">
          {theme.theme === "dark" ? <SunDim size={20} /> : <Moon size={20} />}
        </Button>
        <Button
          onClick={mobileNav.toggle}
          variant="icon"
          className={styles.mobileMenuButton}
          aria-label={mobileNav.isOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileNav.isOpen}
        >
          {mobileNav.isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
    </header>
  );
};
