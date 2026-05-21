import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/formatNumber";
import { TAchievement, TRegistration } from "@/types/shared";

type TAchievementsProps = {
  registrationLabel: TRegistration;

  nextAchievement: null | TAchievement

  currentAchievement: null | TAchievement;

  isPaid: boolean;

}

export default function Achievements({ registrationLabel, nextAchievement, currentAchievement, isPaid }: TAchievementsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {registrationLabel && (
        <Card className="py-0 bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wider font-medium">Registration Level</p>
                <p className="text-lg font-bold text-stone-900 mt-1">{registrationLabel?.name}</p>
                <p className="text-sm text-stone-500">${formatNumber(registrationLabel?.cost)} registration fee</p>
              </div>
              <Badge className={isPaid ? 'bg-emerald-100 text-emerald-700 rounded-full' : 'bg-amber-100 text-amber-700 rounded-full'}>
                {isPaid ? 'Paid' : 'Pending'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
      {(nextAchievement || currentAchievement) && (
        <Card className="py-0 bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <CardContent className="p-6">
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider font-medium">Achievement Level</p>
              {
                currentAchievement && (
                  <>
                    <p className="text-lg font-bold text-stone-900 mt-1">{currentAchievement?.achievement}</p>
                    <p className="text-sm text-stone-500">Swag: {currentAchievement?.swag}</p>
                  </>
                )
              }
              {nextAchievement && (
                <p className="text-xs text-primary-500 mt-2 font-medium">
                  Next: ${formatNumber(nextAchievement?.amount)} &rarr; {nextAchievement?.achievement}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
