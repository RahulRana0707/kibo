import {
  AvatarBoard,
  BadgeBoard,
  ButtonBoard,
  ChipBoard,
  FeedbackAtomsBoard,
  TooltipKbdBoard,
} from "../_boards/atoms-actions"
import { InputBoard, SelectionBoard } from "../_boards/atoms-forms"
import {
  PlatformBoard,
  SourceStatBoard,
  StatusBoard,
  SurfacesBoard,
} from "../_boards/atoms-kibo"

export const metadata = { title: "Atoms · Component library" }

export default function AtomsPage() {
  return (
    <>
      <h1 className="text-display">Atoms</h1>
      <ButtonBoard />
      <BadgeBoard />
      <InputBoard />
      <SelectionBoard />
      <AvatarBoard />
      <TooltipKbdBoard />
      <FeedbackAtomsBoard />
      <ChipBoard />
      <StatusBoard />
      <PlatformBoard />
      <SourceStatBoard />
      <SurfacesBoard />
    </>
  )
}
