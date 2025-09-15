import CallToAction from "@/modules/home/components/CallToAction";
import FeaturesHero from "@/modules/home/components/FeaturesHero";
import GamificationElements from "@/modules/home/components/GamificationElements";
import LifeModuleSection from "@/modules/home/components/LifeModuleSection";


export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black font-poppins">
      <FeaturesHero />
      <LifeModuleSection />
      <GamificationElements />
      <CallToAction />
    </main>
  );
}