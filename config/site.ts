export type SiteConfig = typeof siteConfig;

export const siteConfig = () => ({
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Name",
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Desc",
  sidebarItems: [
    {
      prefix: "Dashboard",
      items: [
        {
          name: "Dashboard",
          href: "/",
          icon: "dashboard",
        },
        {
          name: "Monitor",
          href: "/monitor",
          icon: "monitor",
        },
        {
          name: "Design",
          href: "/design",
          icon: "design",
        },
      ]
    },
    {
      prefix: "Management",
      items: [
        {
          name: "User Management",
          href: "/users",
          icon: "user",
        }
      ]
    },
  ],
});

export const getProtectedRoutes = () => {
  const { sidebarItems } = siteConfig();

  return sidebarItems.flatMap((section) => (
    section.items.map((item) => item.href))
  );
};

