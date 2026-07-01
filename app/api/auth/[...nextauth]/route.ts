import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACK_PUBLIC_API_URL ?? ""

async function verifyMembership(email: string) {
    const url = `${BACKEND_URL}/api/members/verify?email=${encodeURIComponent(email)}`
    console.log("[AUTH] verifyMembership → url:", url)
    console.log("[AUTH] BACKEND_URL env:", BACKEND_URL || "(vide/undefined)")
    try {
        const res = await fetch(url, { cache: "no-store" })
        console.log("[AUTH] verifyMembership → status:", res.status)
        if (!res.ok) {
            const body = await res.text().catch(() => "(impossible de lire le body)")
            console.log("[AUTH] verifyMembership → réponse erreur body:", body)
            return null
        }
        const data = await res.json()
        console.log("[AUTH] verifyMembership → data:", JSON.stringify(data))
        return data
    } catch (err) {
        console.error("[AUTH] verifyMembership → exception:", err)
        return null
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    // Restreint l'écran de connexion aux comptes @etu.he2b.be
                    hd: "etu.he2b.be",
                    prompt: "select_account",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            const email = user.email ?? ""
            console.log("[AUTH] signIn → email:", email)
            // Double vérification du domaine (hd n'est qu'un hint UI)
            if (!email.endsWith("@etu.he2b.be")) {
                console.log("[AUTH] signIn → domaine refusé:", email)
                return "/membres?error=domain"
            }
            const member = await verifyMembership(email)
            console.log("[AUTH] signIn → member retourné:", JSON.stringify(member))
            // Jackson sérialise le champ boolean "isMember" en "member" (suppression du préfixe "is")
            console.log("[AUTH] signIn → member?.member:", member?.member)
            if (!member?.member) {
                console.log("[AUTH] signIn → refusé (not-member) pour:", email)
                return "/membres?error=not-member"
            }
            console.log("[AUTH] signIn → accès autorisé pour:", email)
            return true
        },

        async jwt({ token, user }) {
            if (user) {
                const member = await verifyMembership(user.email ?? "")
                token.memberName = member?.name ?? user.name
                token.memberRole = member?.role ?? ""
                token.memberCampus = member?.campus ?? ""
                token.officeMember = member?.officeMember ?? false
                token.memberImage = member?.image ?? user.image
            }
            return token
        },

        async session({ session, token }) {
            session.user.memberName = token.memberName as string
            session.user.memberRole = token.memberRole as string
            session.user.memberCampus = token.memberCampus as string
            session.user.officeMember = token.officeMember as boolean
            session.user.memberImage = token.memberImage as string
            return session
        },
    },
    pages: {
        signIn: "/membres",
        error: "/membres",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
