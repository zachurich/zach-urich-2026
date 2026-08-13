"use client";

import { Menu, Moon, SunDim, X } from "lucide-react";
import { useTheme } from "@/contexts/Theme/hooks";
import styles from "./header.module.css";
import { Button } from "@/components/Button/Button";
import { useEffect } from "react";
import { HomeLink } from "@/components/HomeLink/HomeLink";
import { useMobileNav } from "@/contexts/MobileNav/hooks";

const ICON_SIZE = 24;

type Props = {
  avatarUrl?: string;
  handle?: string;
};

export const Header = ({ avatarUrl, handle }: Props) => {
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
          <HomeLink avatarUrl={avatarUrl} handle={handle} />
        </div>
      </div>
      <div className={styles.right}>
        <Button onClick={theme.toggleTheme} variant="icon">
          {theme.theme === "dark" ? (
            <SunDim size={ICON_SIZE} />
          ) : (
            <Moon size={ICON_SIZE} />
          )}
        </Button>
        <Button
          onClick={mobileNav.toggle}
          variant="icon"
          className={styles.mobileMenuButton}
          aria-label={mobileNav.isOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileNav.isOpen}
        >
          {mobileNav.isOpen ? (
            <X size={ICON_SIZE} />
          ) : (
            <Menu size={ICON_SIZE} />
          )}
        </Button>
      </div>
    </header>
  );
};
