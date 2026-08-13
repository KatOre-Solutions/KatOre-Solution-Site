/**
 * Contact details and the links built from them.
 *
 * The numbers are stored once, in the local format we display and the
 * international format the links need, so the two can never drift apart. South
 * African mobile numbers drop the leading zero and take the 27 country code:
 * 079 625 1393 becomes 27796251393.
 */

export const CONTACT_EMAIL = "katoresolution@gmail.com";

/** Prefilled into the WhatsApp thread so the first message is never blank. */
const WHATSAPP_MESSAGE =
  "Hi Katore Solutions, I would like to find out how you can help with my project.";

export type WhatsAppContact = {
  name: string;
  role: string;
  /** As displayed on the page, spaced for reading. */
  phone: string;
  /** Country code plus the number without its leading zero. */
  international: string;
};

export const whatsappContacts: WhatsAppContact[] = [
  {
    name: "Ore",
    role: "Founder, Software Engineer",
    phone: "079 625 1393",
    international: "27796251393",
  },
  {
    name: "Kat",
    role: "Co Founder, Software Engineer",
    phone: "066 208 1551",
    international: "27662081551",
  },
];

/**
 * `encodeURIComponent` rather than a hand written escape sequence: the message
 * contains a comma and full stops, and getting one escape wrong silently
 * truncates the prefilled text rather than failing loudly.
 */
export function whatsappLink(international: string): string {
  return `https://wa.me/${international}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

export const emailLink = `mailto:${CONTACT_EMAIL}`;
