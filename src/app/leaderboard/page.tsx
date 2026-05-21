import TabSection from "@/components/leaderboard/TabSection";
import { Trophy } from "lucide-react";

const page = () => {
  return (
    <div className="container-app py-8 md:py-12">
      <div className="text-center mb-8">
        <Trophy className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="text-2xl md:text-3xl font-bold text-stone-900">
          Leaderboard
        </h1>
        <p className="text-stone-500 mt-1">See who's leading the challenge</p>
      </div>
      <TabSection />
    </div>
  );
};

export default page;
