import { LucideProps, Send, Loader2 } from "lucide-react"

export const Icons = {
  loader2: Loader2,
  send: Send,
  // KiboLogo exposed as Icons.logo so signup/login/landing can use it uniformly
  logo: (props: LucideProps) => <KiboLogo {...props} />,
  youtube: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 180"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="#FF0000"
        d="M250.35 28.07A31.8 31.8 0 0 0 227.96 5.6C208.2.3 128 .3 128 .3S47.8.3 28.04 5.6A31.8 31.8 0 0 0 5.65 28.07C.35 47.95.35 89.44.35 89.44s0 41.49 5.3 61.37a31.8 31.8 0 0 0 22.39 22.47c19.76 5.3 99.96 5.3 99.96 5.3s80.2 0 99.96-5.3a31.8 31.8 0 0 0 22.39-22.47c5.3-19.88 5.3-61.37 5.3-61.37s0-41.49-5.3-61.37"
      />
      <path fill="#FFFFFF" d="M102.4 127.36L169.07 89.44 102.4 51.52z" />
    </svg>
  ),
  twitch: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 2400 2800"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="#9146FF"
        d="M500 0L0 500v1800h600v500l500-500h400l900-900V0H500z"
      />
      <path
        fill="#FFFFFF"
        d="M700 200h1500v1100l-500 500h-500l-500 500v-500H700V200z"
      />
      <path
        fill="#9146FF"
        d="M1300 600h200v600h-200V600zm550 0h200v600h-200V600z"
      />
    </svg>
  ),
  discord: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 199"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="#5865F2"
        d="M216.86 16.6A208.5 208.5 0 0 0 164.04.01a144.1 144.1 0 0 0-6.76 13.93 193.3 193.3 0 0 0-58.56 0A149.3 149.3 0 0 0 91.85.01a207.8 207.8 0 0 0-52.86 16.64C5.5 66.4-3.59 114.91.95 162.74a210.8 210.8 0 0 0 64.73 32.74 154.4 154.4 0 0 0 13.87-22.53 135.4 135.4 0 0 1-21.85-10.48c1.83-1.32 3.61-2.7 5.34-4.1a149.2 149.2 0 0 0 129.92 0c1.75 1.43 3.54 2.8 5.34 4.1a136.4 136.4 0 0 1-21.89 10.5 153.2 153.2 0 0 0 13.87 22.5 210.4 210.4 0 0 0 64.76-32.74c5.33-55.45-9.11-103.52-38.18-146.13z"
      />
      <path
        fill="#FFFFFF"
        d="M85.47 132.45c-12.64 0-23-11.6-23-25.84s10.15-25.85 23-25.85c12.95 0 23.2 11.7 23 25.85 0 14.25-10.15 25.84-23 25.84zm85.06 0c-12.64 0-23-11.6-23-25.84s10.15-25.85 23-25.85c12.95 0 23.2 11.7 23 25.85 0 14.25-10.05 25.84-23 25.84z"
      />
    </svg>
  ),
  x: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 1200 1227"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="currentColor"
        d="M714.16 519.28L1160.89 0h-105.86L667.14 450.89 357.33 0H0l468.49 681.82L0 1226.37h105.87l409.62-476.15 327.18 476.15H1200L714.13 519.28h.03zM569.17 687.83l-47.47-67.9-377.7-540.24h162.6l304.8 436.02 47.47 67.9 396.2 566.99h-162.6l-323.3-462.77z"
      />
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.98em"
      height="1em"
      viewBox="0 0 256 262"
      {...props}
    >
      <path
        fill="#4285f4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      ></path>
      <path
        fill="#34a853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      ></path>
      <path
        fill="#fbbc05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
      ></path>
      <path
        fill="#eb4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      ></path>
    </svg>
  ),
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="#000000"
        d="M128 0C57.307 0 0 57.307 0 128c0 56.562 36.665 104.535 87.535 121.469 6.405 1.19 8.753-2.781 8.753-6.17 0-3.063-.122-11.175-.174-21.935-35.606 7.738-43.122-17.178-43.122-17.178-5.83-14.814-14.222-18.757-14.222-18.757-11.64-7.96.877-7.803.877-7.803 12.88.907 19.67 13.237 19.67 13.237 11.437 19.59 29.992 13.928 37.292 10.646 1.14-8.292 4.48-13.933 8.147-17.14-28.426-3.237-58.337-14.213-58.337-63.287 0-13.977 5-25.412 13.237-34.374-1.32-3.24-5.73-16.274 1.256-33.932 0 0 10.8-3.457 35.4 13.146 10.263-2.847 21.285-4.27 32.243-4.32 10.957.05 21.982 1.474 32.25 4.32 24.59-16.603 35.38-13.146 35.38-13.146 7 17.658 2.58 30.692 1.26 33.932 8.25 8.96 13.22 20.397 13.22 34.374 0 49.2-29.96 60-58.44 63.167 4.6 3.97 8.72 11.767 8.72 23.77 0 17.17-.155 30.983-.155 35.195 0 3.407 2.328 7.4 8.8 6.158C219.34 232.508 256 184.546 256 128 256 57.307 198.693 0 128 0z"
      />
    </svg>
  ),
}

/**
 * KiboLogo — the Kibo brand icon.
 *
 * Chat bubble with an AI spark on an emerald green rounded-square background.
 * Accepts standard SVG props; width/height default to 1em so it scales with
 * the surrounding font size, exactly like the other icons in this file.
 */
export function KiboLogo({
  width = "1em",
  height = "1em",
  ...props
}: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={width}
      height={height}
      aria-label="Kibo logo"
      role="img"
      {...props}
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
  )
}
