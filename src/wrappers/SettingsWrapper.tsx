"use client";

import Loader from "@/components/shared/Loader";
import { oklch, formatRgb } from "culori";

import {
    ReactNode,
    useEffect,
    useState
} from "react";

type Shade =
    | 50 | 100 | 200 | 300 | 400
    | 500 | 600 | 700 | 800 | 900 | 950;

export function generatePalette(hex: string): Record<Shade, string> {
    const base = oklch(hex);
    if (!base) throw new Error("Invalid color");

    const scale: Record<Shade, number> = {
        50: 0.97,
        100: 0.94,
        200: 0.88,
        300: 0.80,
        400: 0.70,
        500: base.l,
        600: 0.60,
        700: 0.50,
        800: 0.42,
        900: 0.35,
        950: 0.28,
    };

    const palette = {} as Record<Shade, string>;

    for (const key in scale) {
        const shade = Number(key) as Shade;

        const l = scale[shade];

        // 🔥 key fix: reduce chroma as it gets darker
        const c = base.c * (l / base.l);

        const color = {
            ...base,
            l,
            c,
        };

        palette[shade] = formatRgb(color);
    }

    return palette;
}

export function SettingsWrapper({ children }: { children: ReactNode }) {

    const [loading, setLoading] = useState(true);

    const [primaryColor] = useState("#ff6900");
    // const [primaryColor] = useState("oklch(62.3% 0.214 259.815)");

    useEffect(() => {
        if (!primaryColor) return;

        const palette = generatePalette(primaryColor);

        Object.entries(palette).forEach(([shade, value]) => {
            const rgb = value
                .replace(/rgb\(|\)/g, "")
                .replace(/\//g, "")
                .trim();

            document.documentElement.style.setProperty(
                `--primary-${shade}`,
                rgb
            );
        });
        document.documentElement.style.setProperty(
            "--primary",
            primaryColor
        );

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(false);
    }, [primaryColor]);

    return (
        <div className="min-h-screen">
            {
                loading ? (
                    <Loader />
                ) : (children)
            }
        </div>
    );
}