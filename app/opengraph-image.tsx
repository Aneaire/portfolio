import { ImageResponse } from "next/og";

export const alt =
  "Angelo Santiago — Full Stack Developer, AI Engineer, and CRM Automation Specialist";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "#09090b",
          color: "#f5f5f4",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            width: 735,
            height: "100%",
            borderRight: "1px solid #1f1f22",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 735,
            padding: "58px 40px 52px 68px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#a3a3a3",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.18em",
            }}
          >
            <span
              style={{
                display: "flex",
                width: 12,
                height: 12,
                backgroundColor: "#c7ff00",
              }}
            />
            ANEAIRE.XYZ / PORTFOLIO
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 52,
              fontSize: 82,
              fontWeight: 800,
              letterSpacing: "-0.055em",
              lineHeight: 0.88,
            }}
          >
            <span>ANGELO</span>
            <span>SANTIAGO</span>
          </div>

          <div
            style={{
              display: "flex",
              width: 78,
              height: 6,
              marginTop: 30,
              backgroundColor: "#c7ff00",
            }}
          />

          <div
            style={{
              display: "flex",
              marginTop: 26,
              color: "#d4d4d4",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            Full Stack Developer · AI Engineer
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 12,
              color: "#8d8d93",
              fontSize: 21,
            }}
          >
            Products · Automation · CRM Integrations
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: "auto",
            }}
          >
            {["FULL STACK", "AI SYSTEMS", "CRM AUTOMATION"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  border: "1px solid #343438",
                  padding: "9px 13px",
                  color: "#a3a3a3",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 58,
            right: 62,
            display: "flex",
            width: 375,
            height: 514,
            border: "1px solid #343438",
            backgroundColor: "#f5f5f4",
          }}
        >
          <img
            src="https://aneaire.xyz/profile.png"
            alt=""
            width="375"
            height="514"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              filter: "grayscale(1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -10,
              bottom: -10,
              display: "flex",
              width: 24,
              height: 24,
              border: "5px solid #09090b",
              backgroundColor: "#c7ff00",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
