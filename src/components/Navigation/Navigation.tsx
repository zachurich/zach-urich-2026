"use client";

import Link from "next/link";
import { routes } from "./constants";
import styles from "./navigation.module.css";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { HomeLink } from "@/components/HomeLink/HomeLink";
import { useMobileNav } from "@/contexts/MobileNav/hooks";
import { FadeIn } from "@/components/FadeIn/FadeIn";
import { Theme } from "@/lib/theme";
import { useTheme } from "@/contexts/Theme/hooks";

type Props = {
  tagType?: "aside" | "div";
  avatarUrl?: string;
  handle?: string;
};

const COLOR_MAP: Record<Theme, string[]> = {
  light: [styles.secondary],
  dark: [styles.quaternary],
};

const getExternalRoutes = () => routes.filter((route) => route.external);
const getInternalRoutes = () =>
  routes.filter((route) => !route.external && route.underConstruction !== true);

const Nav = ({ internal }: { internal?: boolean }) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const routeList = internal ? getInternalRoutes() : getExternalRoutes();
  const colorList = COLOR_MAP[theme];

  const getIsActive = (routePath: string) => {
    if (routePath.length === 1) {
      return routePath === pathname;
    }

    // Multiple slashes exist in the pathname
    if (pathname.lastIndexOf("/") > 0) {
      return pathname.startsWith(routePath);
    }

    return pathname === routePath;
  };

  return routeList.map((route, i) => {
    const common = {
      href: route.path,
      className: classNames(styles.link, {
        [styles.active]: getIsActive(route.path),
        link2: route.external,
      }),
    };
    const Icon = route.icon ?? ExternalLink;

    return route.external ? (
      <FadeIn key={route.path} delay={0.1 + i * 0.15}>
        <li>
          <a {...common} target="_blank" rel="noopener noreferrer">
            {route.name}
          </a>
        </li>
      </FadeIn>
    ) : (
      <FadeIn key={route.path} delay={0.1 + i * 0.05}>
        <Link key={route.path} {...common}>
          <Icon size={18} /> {route.name}
        </Link>
      </FadeIn>
    );
  });
};

export const Navigation = ({ tagType = "div", avatarUrl, handle }: Props) => {
  const Tag = tagType;
  const pathname = usePathname();
  const mobileNav = useMobileNav();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    mobileNav.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <FadeIn delay={0.1}>
      <Tag
        className={classNames(styles.navigation, {
          [styles.mobileOpen]: mobileNav.isOpen,
        })}
      >
        <div className={styles.navigationInner}>
          <section id="primary-navigation">
            <div className={styles.desktopHomeLink}>
              <HomeLink avatarUrl={avatarUrl} handle={handle} />
            </div>
            <nav className={styles.navigationList}>
              <Nav
                key={mobileNav.isOpen ? "internalOpen" : "internalClosed"}
                internal
              />
            </nav>
          </section>

          <section id="external-links" className="s-t-xl">
            <FadeIn
              key={mobileNav.isOpen ? "headingOpen" : "headingClosed"}
              delay={0.2}
            >
              <h2 className="heading3 body2">Links</h2>
            </FadeIn>
            <ul
              className={classNames(
                styles.navigationList,
                styles.externalLinks,
              )}
            >
              <Nav key={mobileNav.isOpen ? "externalOpen" : "externalClosed"} />
            </ul>
          </section>
        </div>
      </Tag>
    </FadeIn>
  );
};
