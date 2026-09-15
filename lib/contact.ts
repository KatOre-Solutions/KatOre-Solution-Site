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

/**
 * Where an enquiry came from, named in the first line the visitor sends.
 *
 * There is no contact form to instrument: every enquiry arrives as an email or
 * a WhatsApp thread, so the only place attribution can survive the jump out of
 * the browser is inside the message itself. A visitor who reaches `/contact`
 * from a service page carries that page's slug in `?from=`, and the prefilled
 * text names it, which is what tells you afterwards which page earned the
 * enquiry.
 *
 * Keys are service slugs, so an unknown or absent `from` simply yields no
 * suffix rather than echoing whatever a stranger put in the query string.
 */
const SOURCE_LABELS: Record<string, string> = {
  "web-design-development": "web design and development",
  "custom-software": "custom software",
  "automation-integrations": "automation and integrations",
  "product-development": "product development",
  "hosting-support": "hosting and support",
};

export function sourceLabel(from: string | undefined): string | undefined {
  return from ? SOURCE_LABELS[from] : undefined;
}

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
    role: "Founder",
    phone: "079 625 1393",
    international: "27796251393",
  },
  {
    name: "Kat",
    role: "Co Founder",
    phone: "066 208 1551",
    international: "27662081551",
  },
];

/**
 * `encodeURIComponent` rather than a hand written escape sequence: the message
 * contains a comma and full stops, and getting one escape wrong silently
 * truncates the prefilled text rather than failing loudly.
 */
export function whatsappLink(
  international: string,
  source?: string
): string {
  const label = sourceLabel(source);
  const message = label
    ? `Hi Katore Solutions, I would like to find out how you can help with my ${label} project.`
    : WHATSAPP_MESSAGE;
  return `https://wa.me/${international}?text=${encodeURIComponent(message)}`;
}

export const emailLink = `mailto:${CONTACT_EMAIL}`;

/**
 * The same address, with a subject line naming the service the visitor was
 * reading. `emailLink` stays exported unchanged for the footer, which is site
 * wide and has no page to attribute.
 */
export function emailLinkFor(source?: string): string {
  const label = sourceLabel(source);
  if (!label) return emailLink;
  return `${emailLink}?subject=${encodeURIComponent(`Project enquiry: ${label}`)}`;
}
