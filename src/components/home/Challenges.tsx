"use client";
import { ArrowRight, ChevronLeft, ChevronRight, Mountain } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { TChallenge } from "@/types/shared";

export default function Challenges({ challenges }: { challenges: TChallenge[] }) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scrollChallenges = (direction: "left" | "right") => {
        if (!scrollRef.current) return;

        const scrollAmount = 360;

        scrollRef.current.scrollBy({
            left: direction === "right" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

    if (!challenges.length) return null;

    return (
        <section className="py-16 md:py-24 bg-white" data-testid="challenges-preview">
            <div className="container-app">
                <p className="text-primary font-medium tracking-widest uppercase text-xs text-center mb-3">
                    Virtual Routes
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 text-center mb-12">
                    Choose Your Challenge
                </h2>

                <div className="relative">
                    {/* LEFT BUTTON */}
                    <button
                        onClick={() => scrollChallenges("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 hover:text-primary transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* SCROLL AREA */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory px-8"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        {challenges.map((ch) => (
                            <Card
                                key={ch.id}
                                className="bg-stone-50 rounded-2xl border border-stone-100 overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 min-w-[280px] md:min-w-[320px] snap-start flex-shrink-0"
                                style={{ maxWidth: "340px" }}
                            >
                                <div className="h-3 bg-gradient-to-r from-orange-500 to-emerald-600" />

                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Mountain className="w-5 h-5 text-primary" />
                                        <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                                            {ch.distance} km
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-stone-900 mb-2">
                                        {ch.name}
                                    </h3>

                                    <p className="text-sm text-stone-500 leading-relaxed mb-4 line-clamp-3">
                                        {ch.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {ch.milestones?.slice(0, 3).map((m, i) => (
                                            <span
                                                key={i}
                                                className="text-xs bg-primary-50/5 text-primary px-2 py-0.5 rounded-full"
                                            >
                                                {m.title}
                                            </span>
                                        ))}
                                    </div>

                                    {ch.route_map && (
                                        <div className="rounded-lg overflow-hidden border border-stone-200 bg-white">
                                            <Image
                                                src={process.env.NEXT_PUBLIC_BASE_URL + ch.route_map}
                                                alt={`${ch.name} route`}
                                                className="w-full h-auto object-contain"
                                                width={500}
                                                height={300}
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* RIGHT BUTTON */}
                    <button
                        onClick={() => scrollChallenges("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 hover:text-primary transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <p className="text-center text-xs text-stone-400 mt-2 md:hidden">
                        Use arrows to see more routes
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center mt-10">
                    <Link href="/signup">
                        <Button className="rounded-full bg-primary hover:bg-primary-600 text-white shadow-lg shadow-primary/20 font-medium px-8 py-5 h-auto text-base transition-all hover:scale-[1.02]">
                            Choose Your Route <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}