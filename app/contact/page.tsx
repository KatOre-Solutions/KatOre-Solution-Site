import ContactDetail from "@/components/sections/ContactDetail";
import { CONTACT_EMAIL } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titlePart: "Contact: Software Developers in Johannesburg",
  description: `Hire software developers in Johannesburg. Tell Katore Solutions about your project by email at ${CONTACT_EMAIL} or message us on WhatsApp.`,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactDetail />;
}
