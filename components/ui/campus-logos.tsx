"use client"

import { motion } from "framer-motion"
import CampusLogo from "./campus-logo"

export default function CampusLogos() {
  const campuses = ["defre", "esi", "nivelles", "isib", "ises", "isek", "iessid"] as const

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {campuses.map((campus) => (
        <motion.div
          key={campus}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * campuses.indexOf(campus) }}
        >
          <CampusLogo campus={campus} className="w-20 h-20" />
        </motion.div>
      ))}
    </div>
  )
}
