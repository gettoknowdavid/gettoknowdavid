export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "David Michael II",
  description: "Welcome to the Official portfolio page of David Michael II.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Works",
      href: "/works",
    },
    {
      label: "Resume",
      href: "/resume",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  socials: [
    { name: "Email", url: "mailto:knowdavidmichael@gmail.com" },
    { name: "GitHub", url: "https://github.com/gettoknowdavid" },
    { name: "LinkedIn", url: "https://linkedin.com/in/gettoknowdave" },
    { name: "X", url: "https://x.com/gettoknowdavid" },
    { name: "Instagram", url: "https://instagram.com/gettoknowdavid" },
    { name: "Discord", url: "https://discord.gg/gettoknowdavid" },
  ],
};
