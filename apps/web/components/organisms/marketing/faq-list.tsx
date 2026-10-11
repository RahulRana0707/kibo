import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@kibo/ui/components/accordion"

export type Faq = { question: string; answer: React.ReactNode }

/** Questions that expand one at a time. The first starts open. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <Accordion type="single" collapsible defaultValue={items[0]?.question}>
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent className="pb-5">
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
