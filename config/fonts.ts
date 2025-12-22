import localFont from "next/font/local";
import {Inter} from 'next/font/google';

export const satoshi = localFont({
    src: "../public/fonts/Satoshi-Variable.woff2",
    variable: "--font-satoshi",
});

export const neueMontreal = localFont({
    src: "../public/fonts/NeueMontreal-Light.woff2",
    variable: "--font-neue",
    weight: "100"
});

export const inter = Inter({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-inter",
});