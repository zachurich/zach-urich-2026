import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

type Options = {
  title: string;
  subtitle?: string;
};

/**
 * Shared Open Graph card: brand purple background, cartoon avatar, and a title.
 */
export const renderOgImage = async ({ title, subtitle }: Options) => {
  const avatar = await readFile(join(process.cwd(), "public/me-cartoon.png"));
  const avatarSrc = `data:image/png;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#5822ec",
          color: "#fdf4d3",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            width={96}
            height={96}
            alt=""
            style={{ borderRadius: 16 }}
          />
          <div style={{ fontSize: 40, fontWeight: 700 }}>zachurich.com</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: title.length > 40 ? 64 : 80,
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 32, color: "#c1c2ff" }}>{subtitle}</div>
          )}
        </div>
      </div>
    ),
    OG_IMAGE_SIZE,
  );
};
