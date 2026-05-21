"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/hook/useAuth";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const { user } = useAuth();
  return (
    <section
      className="relative min-h-[85vh] flex items-center"
      data-testid="hero-section"
    >
      <div className="absolute inset-0">
        <Image
          src={"/images/kenya-challenge-hero.jpg"}
          alt="The Kenya Challenge"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          loading="eager"
        />
        <div className="absolute inset-0 bg-stone-900/25" />
      </div>
      <div className="relative container-app py-20">
        <div
          className="max-w-2xl opacity-0 animate-fade-in-up"
          style={{ animationFillMode: "forwards" }}
        >
          <p className="text-primary-50 font-medium tracking-widest uppercase text-xs mb-4">
            Kenya Education Fund
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Step for Impact.
            <br />
            Walk for Education.
          </h1>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
            Join a global virtual walk to help children rise out of poverty and
            build brighter futures. Walk alongside people around the world and
            turn every step into real impact.
          </p>
          <div className="flex flex-wrap gap-3">
            {user ? (
              <Link
                href={
                  user.role === "admin"
                    ? "/admin-dashboard"
                    : user.role === "walker"
                      ? "/walker-dashboard"
                      : user.role === "supporter"
                        ? "/supporter-dashboard"
                        : "/"
                }
              >
                <Button
                  className="rounded-full bg-primary hover:bg-primary-600 text-white shadow-lg shadow-orange-600/20 font-medium px-8 py-6 h-auto text-base transition-all hover:scale-[1.02]"
                  data-testid="hero-cta-btn"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link href="/signup">
                <Button
                  className="rounded-full bg-primary hover:bg-primary-600 text-white shadow-lg shadow-orange-600/20 font-medium px-8 py-6 h-auto text-base transition-all hover:scale-[1.02]"
                  data-testid="hero-cta-btn"
                >
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
