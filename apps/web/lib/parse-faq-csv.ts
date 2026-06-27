export type ParsedFaqRow = {
  question: string
  answer: string
}

function parseCsvLine(line: string) {
  const cells: string[] = []
  let current = ""
  let inQuotes = false

  for (let index = 0; index < line.length; index++) {
    const char = line[index]
    const nextChar = line[index + 1]

    if (char === "\"" && inQuotes && nextChar === "\"") {
      current += "\""
      index++
      continue
    }

    if (char === "\"") {
      inQuotes = !inQuotes
      continue
    }

    if (char === "," && !inQuotes) {
      cells.push(current.trim())
      current = ""
      continue
    }

    current += char
  }

  cells.push(current.trim())
  return cells
}

function normalizeHeader(header: string) {
  return header.trim().toLowerCase().replaceAll(/\s+/g, "")
}

export function parseFaqCsv(text: string): ParsedFaqRow[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length < 2) {
    return []
  }

  const headerLine = lines[0]

  if (!headerLine) {
    return []
  }

  const headers = parseCsvLine(headerLine).map(normalizeHeader)
  const questionIndex = headers.findIndex((header) =>
    ["question", "q", "prompt"].includes(header)
  )
  const answerIndex = headers.findIndex((header) =>
    ["answer", "a", "response"].includes(header)
  )

  if (questionIndex === -1 || answerIndex === -1) {
    return []
  }

  return lines
    .slice(1)
    .map(parseCsvLine)
    .map((cells) => ({
      question: cells[questionIndex]?.trim() ?? "",
      answer: cells[answerIndex]?.trim() ?? "",
    }))
    .filter((row) => row.question && row.answer)
}
