import "../styles/fonts.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GameContextProvider } from "../contexts/game";

export default function App({ Component, pageProps }: AppProps) {
  const metaDesc =
    "Join the Hunger Game fun with four players and a random portal location. Collect points while racing to find the portal before your opponents. Just watch out for explosions!";
  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Hunger Game</title>
        <meta property="og:title" content="Hunger Game" />
        <meta name="twitter:site" content="@dwarvesf" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="description" content={metaDesc} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content="/thumbnail.png" />
        <meta name="twitter:image" content="/thumbnail.png" />
      </Head>
      <GameContextProvider>
        <Component {...pageProps} />
      </GameContextProvider>
    </>
  );
}
