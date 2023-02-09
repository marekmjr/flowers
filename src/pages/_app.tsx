import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";

//theme
import "primereact/resources/themes/soho-light/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import Navigation from "../components/Navigation";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />;
    </>
  );
};

export default api.withTRPC(MyApp);
