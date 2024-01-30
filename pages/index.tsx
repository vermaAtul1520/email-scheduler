import Image from "next/image";
import { Inter } from "next/font/google";
import HoDme from "@/components/Home/home";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <HoDme/>
  );
}
