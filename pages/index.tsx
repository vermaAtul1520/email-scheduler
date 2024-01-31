import Image from "next/image";
import { Inter } from "next/font/google";
import HomeScreen from "@/components/Home/home";
import Popup from "../components/PopUp/popup"
import { usePopupContext } from "@/context/popupcontext"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isPopupOpen } = usePopupContext();
  return (
    <>
      <HomeScreen />
      {isPopupOpen && <Popup/>}
    </>
  );
}
