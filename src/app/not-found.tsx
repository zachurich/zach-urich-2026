import { Metadata } from "next";
import { Page } from "../components/Page/Page";

export async function generateMetadata({ title }: Metadata) {
  return { title: `${title} | Not Found` };
}

const NotFound = () => {
  return (
    <Page>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </Page>
  );
};

export default NotFound;
