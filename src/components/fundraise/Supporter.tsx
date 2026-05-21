import React from "react";
import { Card, CardContent } from "../ui/card";
import { start } from "repl";
import { Heart } from "lucide-react";
import { Badge } from "../ui/badge";
import { TFundraiseSupporter } from "@/types/fundraise";
import { formatNumber } from "@/lib/formatNumber";

const Supporter = ({ suporter }: { suporter?: TFundraiseSupporter[] | [] }) => {
  return (
    <Card className="bg-white rounded-2xl border border-stone-100">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-stone-900 mb-4">Other Supporters</h3>
        {suporter?.length === 0 ? (
          <p className="text-stone-400 text-center py-6">
            No supporters yet. Be the first!
          </p>
        ) : (
          <div className="space-y-2">
            {suporter?.map((p, indx) => (
              <div
                key={indx}
                className="flex items-center justify-between p-3 rounded-xl bg-stone-50"
                data-testid={`pledge-${indx}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-900">
                      Test Supporter Signup
                    </p>
                    <p className="text-xs text-stone-400">
                      {p.type === "fixed"
                        ? `Total pledge`
                        : p.type === "combined"
                          ? "Combined pledge"
                          : `${p.amount}/km pledge`}
                    </p>
                  </div>
                </div>
                <Badge className="bg-emerald-50 text-emerald-700 rounded-full font-bold">
                  {p.type === "per_km" ? `$${formatNumber(p.amount)}/km` : `$${formatNumber(p.amount)}`}
                </Badge>
              </div>
            ))}
            {/* {sponsors?.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-rose-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-stone-900">{s.name}</p>
                        {s.message && <p className="text-xs text-stone-400 italic">"{s.message}"</p>}
                      </div>
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-700 rounded-full font-bold">${s.amount}</Badge>
                  </div>
                ))} */}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Supporter;
