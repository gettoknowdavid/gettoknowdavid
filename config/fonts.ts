import localFont from "next/font/local";

export const fontSans = localFont({
  variable: "--font-sans",
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
      weight: "600",
      style: "normal",
    },
  ],
});
