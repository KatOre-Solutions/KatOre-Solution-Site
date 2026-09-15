import CompanyDetail from "@/components/sections/CompanyDetail";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titlePart: "Engineer Led Software Team",
  description:
    "Katore Solutions is founded and run by engineers, not account managers. Meet the founding team and see how we approach custom software, from first conversation to delivery.",
  path: "/company",
});

export default function CompanyPage() {
  return <CompanyDetail />;
}
