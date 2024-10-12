// pages/signin.tsx

import React from 'react';
import Links from '../src/app/component/Links';
import Head from 'next/head';
import Header from '@/app/component/Header';

const LinksPage = () => {
    return (
        <>
          <Head>
            <title>Links - Kahf Test Project</title>
            <meta name="description" content="Welcome to our link sharing app." />
          </Head>
          <Header />
          <Links />;
        </>
      )
};

export default LinksPage;
