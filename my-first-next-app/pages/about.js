import Nav from '../components/nav';
import Head from 'next/head';
const aboutPage = () => {
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Nav />
      <h2>ABOUT US</h2>
    </div>
  );
};

export default aboutPage;
