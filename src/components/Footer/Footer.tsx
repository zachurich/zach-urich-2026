import classNames from "classnames";
import styles from "./footer.module.css";
import { ArrowRight, Copyright } from "lucide-react";
import { Input } from "@/components/Input/Input";
import { Box } from "@/components/Box/Box";
import { Button } from "@/components/Button/Button";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const Footer = ({ children, className }: Props) => {
  return (
    <footer className={classNames(styles.footer, className)}>
      <Box className={classNames(styles.footerBox)}>
        <div className="heading3 s-b-xxs">Reach out to me</div>
        <form id="footer-contact">
          <Input placeholder="Email address" />{" "}
          <Button
            type="submit"
            variant="icon"
            aria-label="Submit email address"
          >
            <ArrowRight />
          </Button>
        </form>
      </Box>

      <div className={classNames("bodysmall body2", styles.footerContent)}>
        <Copyright size="14" style={{ display: "inline" }} />{" "}
        <span>
          {new Date().getFullYear()} <em>Zach Urich</em>.
        </span>
      </div>
    </footer>
  );
};
