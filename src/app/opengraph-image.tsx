import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Eurin Hash — Ingénierie logicielle, cloud et systèmes";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#050914",
          backgroundImage:
            "radial-gradient(circle at 78% 18%, rgba(92,141,255,0.32), transparent 55%)",
          color: "#f4f7fb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 46, height: 3, background: "#c5f441" }} />
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#9eacc1" }}>EURINHASH</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 66, lineHeight: 1.1, letterSpacing: -2, maxWidth: 900 }}>
            Ingénierie logicielle, cloud et systèmes.
          </div>
          <div style={{ fontSize: 26, color: "#a8b7d1" }}>
            Projets, analyses techniques et expérimentations documentées.
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 20, color: "#7e8da2", letterSpacing: 3 }}>
          <span>ARCHITECTURE</span>
          <span>DEVOPS</span>
          <span>SÉCURITÉ</span>
          <span>IA APPLIQUÉE</span>
        </div>
      </div>
    ),
    size
  );
}
