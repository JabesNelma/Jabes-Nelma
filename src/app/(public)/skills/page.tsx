import { Metadata } from "next"
import { SkillsList } from "./skills-list"

export const metadata: Metadata = {
  title: "Skills | Portfolio",
  description: "Technical skills and proficiencies",
}

export default function SkillsPage() {
  return <SkillsList />
}
