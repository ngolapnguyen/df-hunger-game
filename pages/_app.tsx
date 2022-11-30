import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GameContextProvider } from "../contexts/game";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Hunger Game | Dwarves Foundation</title>
        <meta property="og:title" content="Hunger Game | Dwarves Foundation" />
        <meta name="twitter:site" content="@dwarvesf" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="description" content="Hunger Game | Dwarves Foundation" />
        <meta
          property="og:description"
          content="Hunger Game | Dwarves Foundation"
        />
        <meta property="og:image" content="/thumbnail.jpeg" />
        <meta name="twitter:image" content="/thumbnail.jpeg" />
      </Head>
      <GameContextProvider>
        <Component {...pageProps} />
      </GameContextProvider>
    </>
  );
}
