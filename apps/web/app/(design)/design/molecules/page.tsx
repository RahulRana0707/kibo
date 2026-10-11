import {
  CardsBoard,
  ChartsBoard,
  ChatBoard,
  FeedbackBoard,
  ListsBoard,
  NavigationBoard,
} from "../_boards/molecules-content"
import {
  AuthAndBotBoard,
  FormMoleculesBoard,
  MenusBoard,
  ToastAccordionBoard,
} from "../_boards/molecules-interactive"

export const metadata = { title: "Molecules · Component library" }

export default function MoleculesPage() {
  return (
    <>
      <h1 className="text-display">Molecules</h1>
      <FeedbackBoard />
      <ToastAccordionBoard />
      <NavigationBoard />
      <ListsBoard />
      <FormMoleculesBoard />
      <MenusBoard />
      <ChatBoard />
      <ChartsBoard />
      <CardsBoard />
      <AuthAndBotBoard />
    </>
  )
}
