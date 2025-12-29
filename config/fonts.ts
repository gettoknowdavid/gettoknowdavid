import localFont from "next/font/local";
import {Inter} from 'next/font/google';

export const satoshi = localFont({
    src: "../public/fonts/Satoshi-Variable.woff2",
    variable: "--font-satoshi",
});

export const neue = localFont({
    src: [
        {
            path: "../public/fonts/NeueMontreal-Light.woff2",
            weight: "100",
            style: "normal",
        },
        {
            path: "../public/fonts/NeueMontreal-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/NeueMontreal-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/NeueMontreal-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-neue",
});

export const inter = Inter({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-inter",
});