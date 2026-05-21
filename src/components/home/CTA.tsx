"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import useAuth from "@/hook/useAuth";

export default function CTA() {
  const { user } = useAuth();
  return (
    <section className="py-16 md:py-24 bg-stone-900" data-testid="cta-section">
      <div className="container-app text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to Walk for Education?
        </h2>
        <p className="text-stone-400 max-w-lg mx-auto mb-8">
          Join walkers from around the world. Every step you walk brings a
          Kenyan student closer to their dreams.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={
              user?.role === "admin"
                ? "admin-dashboard"
                : user?.role === "walker"
                  ? "walker-dashboard"
                  : user?.role === "supporter"
                    ? "supporter-dashboard"
                    : ""
            }
          >
            <Button
              className="rounded-full bg-primary hover:bg-primary-600 text-white shadow-lg font-medium px-8 py-6 h-auto text-base"
              data-testid="cta-join-btn"
            >
              {"Join The Challenge"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        <Image
          src="/images/community-walking.jpg"
          alt="Community walking"
          className="mt-12 rounded-2xl object-cover w-full max-w-3xl mx-auto h-62.5 md:h-87.5 opacity-80"
          width={1920}
          height={1080}
        />
      </div>
    </section>
  );
}
