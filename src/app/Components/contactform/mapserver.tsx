import Head from "next/head";
import MapContact from "./map";

export default function MapPage() {
  return (
    <>
      <Head>
        <title>Contact Us - RAAM Ather</title>
        <meta
          name="description"
          content="Get in touch with RAAM Ather for sales, service, and support."
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
        <MapContact />
      </main>
    </>
  );
}
