import { Check } from "lucide-react";

type TJoinTeamProgress = {
    step: number;
    steps: string[];
};

export function JoinTeamProgress({ step, steps }: TJoinTeamProgress) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
                {steps.map((s, i) => (
                    <div key={s} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? 'bg-orange-600 text-white' :
                            i === step ? 'bg-orange-600 text-white ring-4 ring-orange-100' :
                                'bg-stone-200 text-stone-500'
                            }`}>
                            {i < step ? <Check className="w-4 h-4" /> : i + 1}
                        </div>
                        {i < steps.length - 1 && (
                            <div className={`w-16 md:w-24 h-0.5 mx-2 ${i < step ? 'bg-orange-600' : 'bg-stone-200'}`} />
                        )}
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center gap-16 mt-2">
                {steps.map((s, i) => (
                    <p key={s} className={`text-xs font-medium ${i === step ? 'text-orange-600' : 'text-stone-400'}`}>{s}</p>
                ))}
            </div>
        </div>
    );
}