"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { useAllWalkers } from "@/hook/useAllWalkers";
import Spinner from "../shared/Spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const Supporters = () => {
  const { data, isLoading } = useAllWalkers();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedWalker, setSelectedWalker] = useState<any>(null);

  if (isLoading) return <Spinner />;

  return (
    <Card className="bg-white rounded-2xl border border-stone-100">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-stone-900 mb-4">
            All Walkers ({data?.length || 0})
          </h3>
        </div>

        <div className="space-y-2">
          {data?.map((walker: any, indx: number) => (
            <div
              key={indx}
              className="flex items-center justify-between p-3 rounded-xl bg-stone-50"
            >
              <div>
                <p className="text-sm font-medium text-stone-900">
                  {walker?.display_name || walker?.full_name}
                </p>
                <p className="text-xs text-stone-400">{walker?.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  className="rounded-full text-xs bg-stone-100 text-stone-600"
                >
                  {walker?.role}
                </Badge>
                
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedWalker(walker);
                      setOpen(true);
                    }}
                    className="rounded-full"
                  >
                    <Eye className="w-4 h-4 text-stone-400" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Supporters for {selectedWalker?.display_name || selectedWalker?.full_name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedWalker?.supporter_pledges && selectedWalker.supporter_pledges.length > 0 ? (
                selectedWalker.supporter_pledges.map((pledge: any, idx: number) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-stone-100 bg-white gap-4">
                    <div className="flex items-center gap-3">
                      {pledge?.supporter?.image ? (
                        <img src={`${process.env.NEXT_PUBLIC_BASE_URL}${pledge?.supporter?.image}`} alt={pledge.supporter.display_name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-medium">
                          {pledge?.supporter?.display_name?.charAt(0) || pledge.supporter.full_name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-stone-900">
                          {pledge.supporter.display_name || pledge.supporter.full_name}
                        </p>
                        <p className="text-xs text-stone-400">{pledge.supporter.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1">
                      <div className="flex items-center gap-2">
                         <span className="text-sm font-bold text-stone-900">${pledge.amount}</span>
                         {/* <Badge className={`rounded-full text-xs ${pledge.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-600'}`}>
                           {pledge.status}
                         </Badge> */}
                      </div>
                   
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-stone-500 text-center py-4">No supporters found.</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Supporters;
