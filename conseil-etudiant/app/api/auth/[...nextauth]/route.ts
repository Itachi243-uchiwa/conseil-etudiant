import NextAuth from "next-auth"

// La configuration vit dans lib/auth-options.ts pour être réutilisable côté
// serveur (getServerSession) sans importer ce fichier de route.
import { authOptions } from "@/lib/auth-options"

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
