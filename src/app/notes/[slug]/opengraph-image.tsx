import { ImageResponse } from "next/og";
import { getPublicNote } from "@/content/notes";
import { categoryLabel, readingTimeFromMarkdown } from "@/lib/notes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function ArticleOpengraphImage({ params }: Props) {
  const { slug } = await params;
  const note = getPublicNote(slug);

  const category = note ? categoryLabel(note.category) : "Notes & analyses";
  const title = note?.title ?? "Notes & analyses";
  const minutes = note ? readingTimeFromMarkdown(note.markdown) : 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 72px",
          background: "#050914",
          backgroundImage:
            "radial-gradient(circle at 82% 12%, rgba(92,141,255,0.30), transparent 58%)",
          color: "#f4f7fb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 3, background: "#c5f441" }} />
          <div style={{ fontSize: 20, letterSpacing: 5, color: "#c5f441" }}>
            {category.toUpperCase()}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 50 : 62,
            lineHeight: 1.12,
            letterSpacing: -1.5,
            maxWidth: 980,
          }}
        >
          {title.length > 130 ? `${title.slice(0, 127)}…` : title}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#7e8da2" }}>
          <span>EURINHASH / RESEARCH</span>
          <span>{minutes > 0 ? `${minutes} MIN DE LECTURE` : "ANALYSE TECHNIQUE"}</span>
        </div>
      </div>
    ),
    size
  );
}
