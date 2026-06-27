import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@kibo/ui/components/card"
import { MessageSquareTextIcon } from "lucide-react"

const questions = [
  "What microphone do you use?",
  "Where is the Discord server?",
  "When is the next stream?",
  "What game is this?",
]

export function AnswerQueue() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What Kibo will answer first</CardTitle>
        <CardDescription>
          A starter queue based on the questions streamers repeat every day.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {questions.map((question) => (
          <div key={question} className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2">
            <MessageSquareTextIcon className="text-muted-foreground" />
            <span>{question}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
