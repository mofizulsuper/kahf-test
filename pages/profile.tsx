// pages/signin.tsx

import React from 'react';
import Profile from '../src/app/component/Profile';
import Head from 'next/head';
import Header from '@/app/component/Header';

const ProfilePage = () => {
    return (
        <>
          <Head>
            <title>Profile - Kahf Test Project</title>
            <meta name="description" content="Welcome to our link sharing app." />
          </Head>
          <Header />
          <Profile />;
        </>
      )
};

export default ProfilePage;
