import Head from "next/head";
import ContactSection from "./contact"; // Client component

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | Raam Ather</title>
        <meta
          name="description"
          content="Reach out to us for test drives, service bookings, accessories, or any queries you might have."
        />
      </Head>

      <ContactSection />
    </>
  );
}
