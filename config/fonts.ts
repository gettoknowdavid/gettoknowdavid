// import localFont from "next/font/local";
import { Work_Sans as FontSans } from "next/font/google";

export const fontSans = FontSans({
  weight: ["100", "200", "300", "400", "500"],
  subsets: ["latin"],
});

// export const fontSans = localFont({
//   variable: "--font-sans",
//   src: [
//     {
//       path: "../public/fonts/NeueMontreal-Light.woff2",
//       weight: "300",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/NeueMontreal-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/NeueMontreal-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/NeueMontreal-Bold.woff2",
//       weight: "600",
//       style: "normal",
//     },
//   ],
// });
