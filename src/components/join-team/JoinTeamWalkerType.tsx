import { TRegistration } from "@/types/shared";
import { Check } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

type TJoinTeamWalkerTypeProps = {
    walkerTypes: TRegistration[];
    selectedType: number | string;
    setSelectedType: (id: number) => void;
};

export function JoinTeamWalkerType({
    walkerTypes,
    selectedType,
    setSelectedType,
}: TJoinTeamWalkerTypeProps) {
    return (
        <div className="mb-6">
             <h2 className="text-xl md:text-2xl font-bold text-stone-900 mb-2">
              Choose Your Registration Level
            </h2>
            <p className="text-stone-500 text-sm mb-6">
              Select your registration level. 100% of your fees goes directly to
              help a student go to school.
            </p>
            <div className="grid grid-cols-3 gap-3">
                {walkerTypes.map((wt) => (
                    <button key={wt.id} onClick={() => setSelectedType(wt.id)} className="text-left w-full" data-testid={`teammate-type-${wt.id}`}>
                        <Card className={`rounded-xl border-2 transition-all h-full ${selectedType === wt.id
                            ? 'border-orange-500 shadow-[0_4px_20px_-2px_rgba(234,88,12,0.2)]'
                            : 'border-stone-100 hover:border-stone-200'
                            }`}>
                            <CardContent className="p-4 text-center">
                                <Badge className={`rounded-full text-xs mb-2 ${selectedType === wt.id ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-600'}`}>
                                    {wt.name}
                                </Badge>
                                <p className="text-xl font-bold text-stone-900">${wt.cost}</p>
                                {selectedType === wt.id && (
                                    <div className="w-5 h-5 rounded-full bg-orange-600 flex items-center justify-center mx-auto mt-2">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </button>
                ))}
            </div>
        </div>
    );
}