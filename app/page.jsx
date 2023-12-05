import { Inter } from "next/font/google";
import HomeHeroSection from "@/components/home/hero";
import HomeAboutSection from "@/components/home/about";
import HomeFacultySection from "@/components/home/faculty";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="h-full flex flex-col gap-5 pb-5">
      <HomeHeroSection />
      <HomeAboutSection />
      <HomeFacultySection/>
    </div>
  );
}
