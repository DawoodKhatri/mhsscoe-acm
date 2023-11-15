import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "antd";
import Glassmorphism from "@/components/common/glassmorphism";
import HeroSection from "@/components/home/heroSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="h-full">
      <HeroSection />
    </div>
  );
}
