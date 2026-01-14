import { siteConfig } from "@/config/site";

export const getBreadcrumbs = (pathname: string) => {
    const { sidebarItems } = siteConfig();

    for (const section of sidebarItems) {
    for (const item of section.items) {
      if (item.href === pathname) {
        return {
          section: section.prefix,
          name: item.name,
          icon: item.icon,
        };
      }
    }
  }

  return null;
}