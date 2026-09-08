"use client"

import { LuxuryButton } from "@/components/ui/luxury-button"

interface CalendarActionsProps {
    title: string
    description: string
    location: string
    date: string
    time?: string
    slug: string
}

function buildDates(date: string, time?: string) {
    const start = new Date(date)
    if (time) {
        const [h, m] = time.split(":").map(Number)
        start.setHours(h, m)
    }
    const end = new Date(start)
    end.setHours(start.getHours() + 2)
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    return { start: fmt(start), end: fmt(end), startDate: start, endDate: end }
}

export default function CalendarActions({ title, description, location, date, time, slug }: CalendarActionsProps) {
    const handleGoogleCalendar = () => {
        const { start, end } = buildDates(date, time)
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`
        window.open(url, "_blank")
    }

    const handleDownloadICS = () => {
        const { start, end } = buildDates(date, time)
        const ics = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Conseil Étudiant HE2B//Event//FR",
            "BEGIN:VEVENT",
            `UID:${slug}@he2b.be`,
            `DTSTART:${start}`,
            `DTEND:${end}`,
            `SUMMARY:${title}`,
            `DESCRIPTION:${description}`,
            `LOCATION:${location}`,
            "END:VEVENT",
            "END:VCALENDAR",
        ].join("\r\n")

        const blob = new Blob([ics], { type: "text/calendar" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${slug}.ics`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="space-y-3">
            <LuxuryButton variant="outline" className="w-full justify-start" onClick={handleGoogleCalendar}>
                📅 Google Calendar
            </LuxuryButton>
            <LuxuryButton variant="outline" className="w-full justify-start" onClick={handleDownloadICS}>
                📥 Télécharger (.ics)
            </LuxuryButton>
        </div>
    )
}
