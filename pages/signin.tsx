// pages/signin.tsx

import React from 'react';
import SignIn from '../src/app/component/SignIn';
import Head from 'next/head';

const SigninPage = () => {
    return (
        <>
          <Head>
            <title>Signin - Kahf Test Project</title>
            <meta name="description" content="Welcome to our link sharing app." />
          </Head>
          <SignIn />;
        </>
      )
};

export default SigninPage;
