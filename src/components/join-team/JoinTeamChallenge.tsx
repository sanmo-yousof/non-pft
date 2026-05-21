import { Check, Mountain } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { TChallenge } from "@/types/shared";

type TJoinTeamChallenge = {
    challenges: TChallenge[];
    selectedChallenge: number | string;
    setSelectedChallenge: (id: number) => void;
};

export function JoinTeamChallenge({
    challenges,
    selectedChallenge,
    setSelectedChallenge
}: TJoinTeamChallenge) {
    return (
        <div className="mb-6">
             <h2 className="text-xl md:text-2xl font-bold text-stone-900 mb-2">
              Select Your Challenge Route
            </h2>
            <p className="text-stone-500 text-sm mb-6">
              Choose a virtual route to walk.
            </p>
            <div className="grid grid-cols-1 gap-3">
                {challenges.map((ch) => (
                    <button key={ch.id} onClick={() => setSelectedChallenge(ch.id)} className="text-left w-full" data-testid={`teammate-challenge-${ch.id}`}>
                        <Card className={`rounded-xl border-2 transition-all ${selectedChallenge === ch.id
                            ? 'border-orange-500 shadow-[0_4px_20px_-2px_rgba(234,88,12,0.2)]'
                            : 'border-stone-100 hover:border-stone-200'
                            }`}>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Mountain className="w-5 h-5 text-orange-600" />
                                        <div>
                                            <p className="font-bold text-stone-900">{ch.name}</p>
                                            <p className="text-xs text-stone-500">{ch.distance} km</p>
                                        </div>
                                    </div>
                                    {selectedChallenge === ch.id && (
                                        <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </button>
                ))}
            </div>
        </div>
    );
}