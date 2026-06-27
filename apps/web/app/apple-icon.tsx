import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "40px",
        background: "#047857",
        overflow: "hidden",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="180"
        height="180"
      >
        <rect width="100" height="100" rx="24" fill="#047857" />
        <path
          d="M30 26V74"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M66 27L42 50L68 73"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="72" cy="27" r="6" fill="#A7F3D0" />
        <circle cx="72" cy="27" r="2.5" fill="#047857" />
      </svg>
    </div>,
    { ...size }
  )
}
