import ComingSoon from "@/components/fragments/ComingSoon";
import { siteConfig } from "@/config/site";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {

  const config = siteConfig();

  return (
    <DefaultLayout title="Home">
      <ComingSoon />
    </DefaultLayout>
  );
}
