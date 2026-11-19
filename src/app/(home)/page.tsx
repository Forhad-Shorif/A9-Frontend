import Features from "@/components/SheareHome/Features";
import OurSuccessStats from "@/components/SheareHome/OurSuccess";
import HeroBanner from "@/components/SheareHome/Banner";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <HeroBanner />
      <OurSuccessStats />
      <Features />
    </div>
  );
}
