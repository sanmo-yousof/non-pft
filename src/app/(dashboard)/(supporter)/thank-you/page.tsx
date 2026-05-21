"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-stone-100 p-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-stone-900 mb-3">
          Thank You
        </h1>

        <p className="text-stone-600 mb-8 leading-relaxed">
          Your pledge has been submitted successfully.
          <br />
          Thank you for supporting this fundraiser.
        </p>

        <div className="flex flex-col gap-3">
          <Button
            className="rounded-full bg-primary-500 hover:bg-primary-600 h-12"
            onClick={() => router.push("/supporter-dashboard")}
          >
            Go to Dashboard
          </Button>

          <Button
            variant="outline"
            className="rounded-full h-12"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}