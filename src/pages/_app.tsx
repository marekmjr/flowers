import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";

//theme
import "primereact/resources/themes/lara-light-teal/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import Navbar from "../components/landing/navbar";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Flow - Teach your engineers to touch grass</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />;
    </>
  );
};

export default api.withTRPC(MyApp);
