import Head from 'next/head';


const PageNotFound = () => {
  return (
    <>
      <Head>
        <title>Game</title>
        <meta name="description" content="Game page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>404 Page Not Found</h1>
      </main>
    </>
  );
}
export default PageNotFound;