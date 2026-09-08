import "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null
            email?: string | null
            image?: string | null
            memberName: string
            memberRole: string
            memberCampus: string
            officeMember: boolean
            memberImage: string
        }
    }
}
