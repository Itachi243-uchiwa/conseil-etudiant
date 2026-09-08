import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileX } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"

export default function NotFound() {
    return (
        <div className="relative">
            <ParallaxBackground />

            <div className="container py-20">
                <div className="max-w-2xl mx-auto text-center">
                    <Card>
                        <CardHeader>
                            <div className="mx-auto mb-4 p-4 bg-muted rounded-full w-fit">
                                <FileX className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <CardTitle className="text-2xl">Article non trouvé</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild>
                                    <Link href="/news">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Retour aux actualités
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/">Accueil</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
