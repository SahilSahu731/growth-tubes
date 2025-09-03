import CallToAction from "@/modules/components/features/CallToAction";
import FeaturesHero from "@/modules/components/features/FeaturesHero";
import GamificationElements from "@/modules/components/features/GamificationElements";
import LifeModuleSection from "@/modules/components/features/LifeModuleSection";


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