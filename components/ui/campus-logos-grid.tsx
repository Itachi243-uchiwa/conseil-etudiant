"use client"

import { motion } from "framer-motion"
import CampusLogo from "@/components/ui/campus-logo"

export default function CampusLogosGrid() {
  const campuses = [
    { id: "defre", name: "Defré" },
    { id: "esi", name: "ESI" },
    { id: "nivelles", name: "Nivelles" },
    { id: "isib", name: "ISIB" },
    { id: "ises", name: "ISES" },
    { id: "isek", name: "ISEK" },
    { id: "iessid", name: "IESSID" },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
      {campuses.map((campus, index) => (
        <motion.div
          key={campus.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex flex-col items-center"
        >
          <CampusLogo campus={campus.id as any} className="w-24 h-24 mb-2" />
          <p className="font-medium text-center">{campus.name}</p>
        </motion.div>
      ))}
    </div>
  )
}
