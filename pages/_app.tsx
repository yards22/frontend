import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import { StoresContext } from "../Logic/Providers/StoresProviders";
import { RTodoLocal, RTodoRemote } from "../Logic/Repository/RTodo";
import { TodoStore } from "../Logic/State/TodoStore";

function MyApp({ Component, pageProps }: AppProps) {
  // now we can use any repo, either local or remote
  const todoRepoLocal = new RTodoLocal();
  const todoRepoRemote = new RTodoRemote("http://localhost:4000");
  const todoStore = new TodoStore(todoRepoLocal);
  return (
    <StoresContext.Provider value={{ todoStore }}>
      <ThemeProvider theme={{}}>
        <Head>
          <meta name="theme-color" content="#121827" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </StoresContext.Provider>
  );
}
export default MyApp;
