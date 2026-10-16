import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1c34",
          color: "#ffffff",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 96, color: "#c9a227", marginBottom: 8 }}>§</div>
        <div style={{ fontSize: 64, fontWeight: 800 }}>
          USA <span style={{ color: "#c9a227" }}>Attorneys</span>
        </div>
        <div style={{ fontSize: 28, color: "#b9c6dc", marginTop: 16 }}>
          Find a qualified attorney in all 50 states
        </div>
      </div>
    ),
    { ...size }
  );
}
