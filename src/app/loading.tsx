import type { Metadata } from "next";
import { Page } from "../components/Page/Page";

export async function generateMetadata({ title }: Metadata) {
  return { title: `${title} | Home` };
}

export default function Loading() {
  return <Page>{null}</Page>;
}
