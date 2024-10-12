// pages/register.tsx

import React from 'react';
import Register from '../src/app/component/Register'; // Adjust the path if necessary
import Head from 'next/head';

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register - Kahf Test Project</title>
        <meta name="description" content="Welcome to our link sharing app." />
      </Head>
      <Register />;
    </>
  )
};

export default RegisterPage;
