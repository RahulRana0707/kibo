import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "7px",
        background: "#047857", /* --primary: oklch(0.508 0.118 165.612) */
        overflow: "hidden",
      }}
    >
      {/* Chat bubble body */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="32"
        height="32"
      >
        <rect width="100" height="100" rx="22" fill="#047857" />
        <g transform="translate(0, 4)">
          <path
            d="M 22 28 C 22 18, 30 11, 40 11 L 60 11 C 70 11, 78 18, 78 28 L 78 52 C 78 62, 70 69, 60 69 L 44 69 L 24 83 L 24 67 C 22.5 64, 22 58, 22 52 Z"
            fill="none"
            stroke="#FFFFFF"
            stroke-width="6"
            stroke-linejoin="round"
            stroke-linecap="round"
          />
          <path
            d="M 50 23 C 50 31, 54 37, 63 40 C 54 43, 50 49, 50 57 C 50 49, 46 43, 37 40 C 46 37, 50 31, 50 23 Z"
            fill="#FFFFFF"
          />
        </g>
      </svg>
    </div>,
    { ...size }
  )
}
