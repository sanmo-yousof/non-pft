import React from "react";
import { Card, CardContent } from "../ui/card";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Script from "next/script";

const Donate = () => {
  return (
    <>
      <Script
        src="https://widgets.givebutter.com/latest.umd.cjs"
        strategy="afterInteractive"
      />
      <Card
        className="bg-primary-50/5 rounded-2xl border border-primary-100/20 mt-6"
        data-testid="givebutter-placeholder"
      >
        <CardContent className="p-6 text-center">
          <Heart className="w-8 h-8 text-primary-500 mx-auto mb-2" />
          <h3 className="text-base font-bold text-stone-900 mb-1">
            Donate Directly via GiveButter
          </h3>
          <p className="text-xs text-stone-500 mb-3">
            KEF uses GiveButter for secure payment processing. Click below to
            donate directly.
          </p>

          <Button
            variant="outline"
            className="rounded-full border-primary-500 text-primary-500 hover:bg-primary-50/10"
            asChild
          >
            <Link
              href="https://givebutter.com/25yearsofimpact"
              // target="_blank"
              rel="noopener noreferrer"
            >
              <Heart className="w-4 h-4 mr-2" /> Donate via GiveButter
            </Link>
          </Button>
          {/* <p className="text-[10px] text-stone-400 mt-2">GiveButter embed code will be added here</p> */}
        </CardContent>
      </Card>
    </>
  );
};

export default Donate;
