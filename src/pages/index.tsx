import { type NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>NG Flowers</title>
        <meta name="description" content="Aplikace pro zprávu květin v NG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style>
        
      </style>
      <div>
      <main>
        <Hero/>
      </main>
      
      </div>
    </>
  )
}


export default Home;