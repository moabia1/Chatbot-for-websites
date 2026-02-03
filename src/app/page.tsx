import Features from "@/components/features";
import Header from "@/components/Header";
import HomeClient from "@/components/HomeClient";
import Image from "next/image";

export default function Home() {
  return (
    <div>

      <Header/>
      <HomeClient />
      <Features/>
    </div>
  );
}
