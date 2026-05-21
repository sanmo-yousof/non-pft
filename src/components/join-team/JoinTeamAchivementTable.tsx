import { Award } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { TAchievement } from "@/types/shared";

type TJoinTeamAchievementTableProps = {
    levels: TAchievement[];
};

export function JoinTeamAchievementTable({ levels }: TJoinTeamAchievementTableProps) {
    return (
        <Card className="rounded-xl border border-stone-100 bg-stone-50 mb-6">
            <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-orange-600" />
                    <h3 className="font-bold text-stone-900">Achievement Levels</h3>
                    <Badge variant={"outline"} className="rounded-full text-[10px] border-stone-200 text-stone-400 ml-auto">Info</Badge>
                </div>
                <p className="text-xs text-stone-500 mb-3">
                    As your total amount raised grows (your fee + teammates + supporters), you unlock achievement levels and earn swag.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-stone-200">
                                <th className="text-left py-1.5 px-2 text-xs text-stone-400 font-medium">Level</th>
                                <th className="text-left py-1.5 px-2 text-xs text-stone-400 font-medium">Amount</th>
                                <th className="text-left py-1.5 px-2 text-xs text-stone-400 font-medium">Swag</th>
                            </tr>
                        </thead>
                        <tbody>
                            {levels.map((al) => (
                                <tr key={al.id} className="border-b border-stone-100 last:border-none">
                                    <td className="py-2 px-2 text-sm font-medium text-stone-700">{al.achievement}</td>
                                    <td className="py-2 px-2 text-sm text-stone-600">${al.amount.toLocaleString()}</td>
                                    <td className="py-2 px-2 text-xs text-stone-500">{al.swag}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}