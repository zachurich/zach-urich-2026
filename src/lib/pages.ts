import mdx, { ContentMetadata } from "@/lib/mdx";

export type PageMetadata = ContentMetadata;

function getPageSlugs(): string[] {
  return mdx.getContentSlugs("pages");
}

function getPageMetadata(slug: string): PageMetadata {
  return mdx.getContentMetadata("pages", slug);
}

function getAllPages(): PageMetadata[] {
  return mdx.getAllContent("pages");
}

function getPageBySlug(slug: string) {
  return mdx.getContentBySlug("pages", slug);
}

const pages = {
  getPageSlugs,
  getPageMetadata,
  getAllPages,
  getPageBySlug,
};

export default pages;
