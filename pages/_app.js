import "tailwindcss/tailwind.css";
import Head from "next/head";
import { AuthProvider } from "../auth";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import "../styles/bootstrap.min.css";
import { Provider } from "@lyket/react";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
      ></Script>

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="../public/apple-touch-icon.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="../public/favicon-32x32.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="../public/favicon-16x16.png"
      ></link>
      <link rel="manifest" href="../public/site.webmanifest"></link>
      <link
        rel="mask-icon"
        href="../public/safari-pinned-tab.svg"
        color="#5bbad5"
      ></link>
      <link rel="shortcut icon" href="../public/favicon.ico"></link>
      <meta name="msapplication-TileColor" content="#da532c"></meta>
      <meta
        name="msapplication-config"
        content="../public/browserconfig.xml"
      ></meta>
      <meta name="theme-color" content="#ffffff"></meta>
      <Provider
        apiKey="pt_23dcbe90613fbc1c636564e9693805"
        disableSessionId="true"
      >
        <ChakraProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
