import type { Platform } from "@/components/atoms/platform-icon"

/** The demo stream summary shown at /share/sample until real summaries exist. */
export const sampleSummary = {
  creator: {
    name: "Mira Okafor",
    initials: "MO",
    links: "youtube.com/@miraplays · twitch.tv/miraplays",
  },
  title: "Ranked grind to Immortal — day 14",
  when: "Thu, Oct 9, 2026 · 7:02–10:14 PM IST",
  platforms: ["youtube", "twitch"] as Platform[],
  game: "Valorant",
  stats: [
    { label: "Peak viewers", value: "1,912" },
    { label: "Chat messages", value: "4,812" },
    { label: "Unique chatters", value: "688" },
    { label: "New chatters", value: "37" },
    { label: "Questions answered", value: "312" },
  ],
  axis: ["7:00 PM", "7:48", "8:36", "9:24", "10:14 PM"],
  highlights: [
    {
      at: "0:04",
      title: "Stream starts, 212 viewers in the first minute",
      detail: "Go-live post on Discord and X",
    },
    {
      at: "0:52",
      title: "Raid from nightowl_gg · 340 viewers",
      detail: "Kibo welcomed raiders and turned on slow mode for 2 minutes",
    },
    {
      at: "1:31",
      title: "Hydrafuel segment",
      detail: "Code MIRA10 shared 6 times by the bot",
    },
    {
      at: "2:10",
      title: "1v4 ace on Lotus",
      detail: "Chat hit 412 messages a minute",
      clip: true,
    },
    {
      at: "3:08",
      title: "Reached Immortal 1",
      detail: "Mood peaked; 61 “GG” messages in 30 seconds",
    },
  ],
  topQuestions: [
    { question: "What’s your sens?", count: 41 },
    { question: "What rank are you?", count: 28 },
    { question: "Discord link?", count: 22 },
    { question: "Which keyboard?", count: 17 },
  ],
  sponsor: { name: "Hydrafuel", code: "MIRA10", mentions: "6", clicks: "184" },
}

/** Chat mood and messages per minute through a stream, sampled 13 times. */
const ys = {
  mood: [120, 112, 100, 104, 90, 80, 76, 70, 52, 20, 40, 46, 50],
  activity: [150, 140, 130, 135, 110, 115, 90, 95, 70, 30, 60, 75, 85],
}
export const moodTrend = ys.mood.map((y, index) => ({ label: String(index), value: 180 - y }))
export const activityTrend = ys.activity.map((y, index) => ({ label: String(index), value: 180 - y }))
