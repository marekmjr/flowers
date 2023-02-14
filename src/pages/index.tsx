import Head from "next/head";
import Hero from "../components/landing/hero";
import Navbar from "../components/landing/navbar";
import SectionTitle from "../components/landing/sectionTitle";

import { benefitOne, benefitTwo } from "../components/landing/data";
import Video from "../components/landing/video";
import Benefits from "../components/landing/benefits";
import Footer from "../components/landing/footer";
import Testimonials from "../components/landing/testimonials";
import Cta from "../components/landing/cta";
import Faq from "../components/landing/faq";

//import dynamic from "next/dynamic";

// const Video = dynamic(() => import("../components/landing/video"));

// const Benefits = dynamic(() => import("../components/landing/benefits"));
// const Footer = dynamic(() => import("../components/landing/footer"));
// const Testimonials = dynamic(() => import("../components/landing/testimonials"));
// const Cta = dynamic(() => import("../components/landing/cta"));
// const Faq = dynamic(() => import("../components/landing/faq"));

export default function Home() {
  return (
    <>
      <Hero />
      <SectionTitle
        pretitle="flow Benefits"
        title=" Why should you use flow in your office">
        flow is a free web application to give you full control over flowers inside your
        office whether you are indie startup or professional corporate.
        Its crafted with Next.js, TailwindCSS & Prisma. 
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      <Video />
      <SectionTitle
        pretitle="Testimonials"
        title="Here's what our customers said">
Happy customers are the most important thing for our brand!
      </SectionTitle>
      <Testimonials />
      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
Before you send us a message take a look at a frequent messages that our helpline have to deal with.
      </SectionTitle>
      <Faq />
      <Cta />
      <Footer />
    </>
  );
}