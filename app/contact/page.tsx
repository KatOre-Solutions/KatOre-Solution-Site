import ContactDetail from "@/components/sections/ContactDetail";
import { CONTACT_EMAIL } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titlePart: "Start Your Software Project",
  description: `Tell Katore Solutions about your project by email at ${CONTACT_EMAIL} or on WhatsApp. We build custom software, websites and automation for the businesses that run on them.`,
  path: "/contact",
});

/**
 * `?from=<service slug>` is set by the call to action on each service page, and
 * names that service in the prefilled email subject and WhatsApp message. It is
 * the only attribution available here: the enquiry leaves the browser for a
 * mail client or WhatsApp, so anything not carried in the message itself is
 * lost. Reading it makes this route dynamic, which at this traffic costs
 * nothing worth keeping a prerender for.
 */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { from } = await searchParams;
  return <ContactDetail source={typeof from === "string" ? from : undefined} />;
}
