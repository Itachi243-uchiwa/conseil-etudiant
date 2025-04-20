import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact | Conseil Étudiant HE2B",
  description: "Contactez le Conseil Étudiant HE2B pour toute question ou demande",
}

export default function ContactPage() {
  return <ContactPageClient />
}
