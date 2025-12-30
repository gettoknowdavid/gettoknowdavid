import localFont from "next/font/local";

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