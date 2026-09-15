import ContactDetail from "@/components/sections/ContactDetail";
import { CONTACT_EMAIL } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titlePart: "Start Your Software Project",
  description: `Tell Katore Solutions about your project by email at ${CONTACT_EMAIL} or on WhatsApp. We build custom software, websites and automation for businesses across South Africa.`,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactDetail />;
}
