"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Briefcase, Coins, FileText, GraduationCap, Scale } from "lucide-react"

const services = [
  {
    title: "Aide juridique",
    description: "Conseils et assistance pour vos questions juridiques liées à vos études.",
    icon: Scale,
    href: "/services/aide-juridique",
  },
  {
    title: "Soutien financier",
    description: "Informations sur les bourses, allocations et aides financières disponibles.",
    icon: Coins,
    href: "/services/soutien-financier",
  },
  {
    title: "Accompagnement pédagogique",
    description: "Soutien pour vos démarches académiques et administratives.",
    icon: GraduationCap,
    href: "/services/accompagnement",
  },
  {
    title: "Service d'aide à la réussite",
    description: "Ressources et conseils pour vous aider à réussir vos études.",
    icon: BookOpen,
    href: "/services/aide-reussite",
  },
  {
    title: "Aide aux recours",
    description: "Assistance pour les procédures de recours académiques.",
    icon: FileText,
    href: "/services/recours",
  },
  {
    title: "Insertion professionnelle",
    description: "Conseils pour votre future carrière et votre insertion professionnelle.",
    icon: Briefcase,
    href: "/services/insertion",
  },
]

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les services que nous proposons pour vous accompagner tout au long de votre parcours académique.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="p-0 h-auto">
                    <Link href={service.href} className="text-primary font-medium">
                      En savoir plus
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Button asChild size="lg">
            <Link href="/services">Voir tous nos services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
