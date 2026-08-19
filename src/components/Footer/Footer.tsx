import classNames from "classnames";
import { ClientVisited } from "@/components/ClientVisited/ClientVisited";
import styles from "./footer.module.css";
import { Copyright } from "lucide-react";
import { LinkWithIcon } from "@/components/LinkWithIcon/LinkWithIcon";
import { HomeLink } from "@/components/HomeLink/HomeLink";
import { List } from "@/components/List/List";
import github from "@/lib/github";
import { dateFromString } from "@/utils/dates";
import visitor from "@/lib/visitor";
import { cookies } from "next/headers";
import { Container } from "@/components/Container/Container";
import { getExternalRoutes } from "../Navigation/helpers";
import { InlineBox } from "../InlineBox/InlineBox";

type Props = {
  className?: string;
};

export const Footer = async ({ className }: Props) => {
  const latestCommit = await github.getLatestCommit();
  const visitorCount = await visitor.getVisitorCount();
  const cookieList = await cookies();
  const visited = visitor.getVistedCookie(cookieList.get("visited")?.value);
  const externalRoutes = getExternalRoutes();
  return (
    <footer className={classNames(styles.footer, className)}>
      <Container className={styles.footerContainer}>
        <div className={styles.footerWrapper}>
          <div className={styles.footerHomeLink}>
            <HomeLink />
          </div>
          <div className={classNames("bodysmall body2", styles.footerContent)}>
            <div className={classNames(styles.footerLinks)}>
              <div className="body2 emphasized s-b-xxs">site info</div>
              <List>
                <div>updated {dateFromString(latestCommit.date)}</div>
                {visitorCount !== null && (
                  <div>
                    visitor count: <InlineBox>{visitorCount}</InlineBox>
                  </div>
                )}
                <LinkWithIcon variant="inline" href="/info">
                  more
                </LinkWithIcon>
              </List>
            </div>
            <div className={classNames(styles.footerLinks)}>
              <div className="body2 emphasized s-b-xxs">elsewhere</div>
              <List>
                {externalRoutes.map((route) => {
                  return (
                    <LinkWithIcon
                      key={"footer-" + route.path}
                      variant="inline"
                      href={route.path}
                    >
                      {route.name.toLowerCase()}
                    </LinkWithIcon>
                  );
                })}
              </List>
            </div>
            <div className={classNames(styles.footerLinks)}>
              <div className="body2 emphasized s-b-xxs">other stuff</div>
              <List>
                <LinkWithIcon
                  variant="inline"
                  href="https://github.com/zachurich/zach-urich-2026"
                >
                  source
                </LinkWithIcon>
                <LinkWithIcon
                  variant="inline"
                  href="https://sites.zachurich.com"
                >
                  websites
                </LinkWithIcon>
              </List>
            </div>
          </div>
          {/* <div className={classNames(styles.footerAvatar)}>
        <Box></Box>
      </div> */}
        </div>
        <div className={classNames(styles.footerCopyright, "bodysmall body2")}>
          <Copyright size="12" style={{ display: "inline" }} />{" "}
          <span>{new Date().getFullYear()} Zach Urich.</span>
        </div>
        <ClientVisited visited={visited} />
      </Container>
    </footer>
  );
};
