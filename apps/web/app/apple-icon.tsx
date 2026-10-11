import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/** The Kibo mark: a K on a near-black square, as in the design system. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#23212b",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="180"
        height="180"
      >
        <path
          d="M11.5 9v14M11.5 17.2L20.5 9M14.6 14.4L21 23"
          fill="none"
          stroke="#fcfcfe"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    { ...size }
  )
}
