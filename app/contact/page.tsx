import ContactDetail from "@/components/sections/ContactDetail";
import { CONTACT_EMAIL } from "@/lib/contact";

export const metadata = {
  title: "Contact | Katore Solutions",
  description: `Tell us about your idea, challenge, or project. Reach Katore Solutions by email at ${CONTACT_EMAIL} or message the founding team on WhatsApp.`,
};

export default function ContactPage() {
  return <ContactDetail />;
}
