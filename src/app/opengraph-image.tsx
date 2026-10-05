import { OG_IMAGE_SIZE, renderOgImage } from "@/lib/ogImage";
import { SITE_NAME } from "@/lib/seo";

export const alt = SITE_NAME;
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: SITE_NAME,
    subtitle: "I build stuff on the web and have a knack for creativity.",
  });
}
