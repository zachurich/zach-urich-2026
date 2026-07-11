import { Container } from "../Container/Container";
import { Transition } from "../Transition/Transition";
import styles from "./page.module.css";

type Props = {
  children?: React.ReactNode;
  container?: boolean;
};

export const Page = ({ children, container = true }: Props) => {
  return (
    <Transition className={styles.page}>
      {container ? <Container tagType="main">{children}</Container> : children}
    </Transition>
  );
};
