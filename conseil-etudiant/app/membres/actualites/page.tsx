"use client"

import MemberShell from "@/components/membres/MemberShell"
import { useEffect, useState } from "react"
import { getDocuments } from "@/lib/members-api"
import { Newspaper, Calendar, User, Lock } from "lucide-react"

export default function ActualitesMembresPage() {
    const [news, setNews] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getDocuments({ type: "ACTUALITE" }).then(setNews).finally(() => setLoading(false))
    }, [])

    return (
        <MemberShell>
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">Actualités membres</h1>
                        <p className="text-muted-foreground mt-1">Informations réservées aux membres du Conseil Étudiant</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 bg-primary/10 border border-primary/30 text-primary text-xs px-3 py-1.5 rounded-full">
                        <Lock className="w-3 h-3" />
                        Espace privé
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="border border-border bg-card/60 rounded-2xl p-6 animate-pulse">
                                <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                                <div className="space-y-1.5 mb-4">
                                    <div className="h-3.5 bg-muted rounded w-full" />
                                    <div className="h-3.5 bg-muted rounded w-5/6" />
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-3 bg-muted rounded w-20" />
                                    <div className="h-3 bg-muted rounded w-28" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : news.length === 0 ? (
                    <div className="text-center py-20 border border-border rounded-2xl text-muted-foreground">
                        <Newspaper className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p>Aucune actualité pour le moment</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {news.map((item: any) => (
                            <article key={item.id} className="border border-border bg-card/60 rounded-2xl p-6 hover:bg-muted/50 transition-all">
                                <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
                                {item.description && (
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.description}</p>
                                )}
                                <div className="flex items-center gap-4 text-muted-foreground text-xs">
                                    {item.authorName && (
                                        <span className="flex items-center gap-1">
                                            <User className="w-3 h-3" />{item.authorName}
                                        </span>
                                    )}
                                    {item.createdAt && (
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(item.createdAt).toLocaleDateString("fr-FR", {
                                                day: "numeric", month: "long", year: "numeric"
                                            })}
                                        </span>
                                    )}
                                </div>
                                {item.fileUrl && (
                                    <a href={item.fileUrl} target="_blank" rel="noopener noreferrer"
                                        className="inline-block mt-4 text-primary text-sm hover:underline">
                                        Lire la suite →
                                    </a>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </MemberShell>
    )
}
