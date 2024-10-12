// pages/index.tsx

import React from 'react';
import Head from 'next/head';
import Home from '../src/app/component/Home';

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Home - Kahf Test Project</title>
        <meta name="description" content="Welcome to our link sharing app." />
      </Head>
      <Home />
    </>
  );
};

export default IndexPage;
