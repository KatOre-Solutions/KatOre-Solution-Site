import CompanyDetail from "@/components/sections/CompanyDetail";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titlePart: "About Us: A Johannesburg Software Studio",
  description:
    "Katore Solutions is a software development studio in Johannesburg, founded and run by engineers. Meet the founding team and how we build technology.",
  path: "/company",
});

export default function CompanyPage() {
  return <CompanyDetail />;
}
