"use client";

import Link from "next/link";
import { routes } from "./constants";
import styles from "./navigation.module.css";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { HomeLink } from "@/components/HomeLink/HomeLink";

type Props = {
  tagType?: "aside" | "div";
};

const colorList = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-tertiary)",
];

const getExternalRoutes = () => routes.filter((route) => route.external);
const getInternalRoutes = () =>
  routes.filter((route) => !route.external && route.underConstruction !== true);

const Nav = ({ internal }: { internal?: boolean }) => {
  const pathname = usePathname();
  const routeList = internal ? getInternalRoutes() : getExternalRoutes();

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
      <li key={route.path}>
        <a {...common} target="_blank" rel="noopener noreferrer">
          {route.name}
        </a>
      </li>
    ) : (
      <Link
        key={route.path}
        {...common}
        style={{ stroke: colorList[i % colorList.length] }}
      >
        <Icon size={18} /> {route.name}
      </Link>
    );
  });
};

export const Navigation = ({ tagType = "div" }: Props) => {
  const Tag = tagType;
  const isMobile = useIsMobile();
  if (isMobile) {
    return null;
  }
  return (
    <Tag className={styles.navigation}>
      <section id="primary-navigation">
        <HomeLink />
        <nav className={styles.navigationList}>
          <Nav internal />
        </nav>
      </section>

      <section id="external-links">
        <h2 className="heading3 body2">Links</h2>
        <ul className={classNames(styles.navigationList, styles.externalLinks)}>
          <Nav />
        </ul>
      </section>
    </Tag>
  );
};
