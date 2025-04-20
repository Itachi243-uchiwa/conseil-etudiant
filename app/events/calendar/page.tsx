import type { Metadata } from "next"
import CalendarClientPage from "./CalendarClientPage"

// Métadonnées exportées pour le serveur
export const metadata: Metadata = {
  title: "Calendrier des événements | Conseil Étudiant HE2B",
  description: "Calendrier des événements organisés par le Conseil Étudiant HE2B",
}

export default function CalendarPage() {
  return <CalendarClientPage />
}
