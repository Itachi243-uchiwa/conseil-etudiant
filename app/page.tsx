import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import AboutSection from "@/components/sections/about-section"
import EventsSection from "@/components/sections/events-section"
import NewsSection from "@/components/sections/news-section"
import JoinSection from "@/components/sections/join-section"
import PartnersSection from "@/components/sections/partners-section"
import FeaturedSection from "@/components/sections/featured-section"
import CampusSectionSimple from "@/components/sections/campus-section-simple"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FeaturedSection />
      <AboutSection />
      <ServicesSection />
      <CampusSectionSimple />
      <EventsSection />
      <NewsSection />
      <JoinSection />
      <PartnersSection />
    </div>
  )
}
