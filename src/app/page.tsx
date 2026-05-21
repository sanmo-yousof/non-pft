import About from "@/components/home/About";
import BecomeSponsor from "@/components/home/BecomeSponsor";
import Challenges from "@/components/home/Challenges";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import ImpactStats from "@/components/home/ImpactStats";
import JoinToWalk from "@/components/home/JoinToWalk";
import KEF from "@/components/home/KEF";
import OurPartners from "@/components/home/OurPartners";
import { TChallenge } from "@/types/shared";

export type TSponsor = {
  id: number;
  name: string;
  sponsorship_level: string;
  url: string;
  logo: string;
  created_at: string;
  updated_at: string;
};

type THomeResponse = {
  challenges: TChallenge[];
  sponsors: TSponsor[];
};

export const dynamic = "force-dynamic";

export default async function Page() {
  let data: THomeResponse | null = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home`);
    const resData = await res.json();
    data = resData?.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <Hero />
      <About />
      <ImpactStats />
      <HowItWorks />
      <JoinToWalk />
      <Challenges challenges={data?.challenges || []} />
      <KEF />
      <CTA />
      <OurPartners sponsors={data?.sponsors || []} />
      <BecomeSponsor />
      <Footer />
    </div>
  );
}