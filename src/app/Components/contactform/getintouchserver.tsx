import React from "react";
import Head from "next/head";
import GetInTouchClient from "./getintouch";

export default function GetInTouchServer() {
  // Static data for SEO or future dynamic fetch
  const contactInfo = {
    phone: "+91 90323 33833",
    email: "marketing@raamather.com",
    hours: "9:30 am – 6:30 pm",
  };

  return (
    <>
      <Head>
        <title>Get in Touch | Raam Ather</title>
        <meta
          name="description"
          content="Contact Raam Ather dealerships for test rides, Ather scooter sales, EV servicing, and home charging installation."
        />
        <meta
          name="keywords"
          content="Raam Ather contact, Ather dealer, book Ather test ride, EV service, Raam Ather phone, Raam Ather email"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Pass data as props to client */}
      <GetInTouchClient contactInfo={contactInfo} />
    </>
  );
}