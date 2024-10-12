import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Menu = styled.nav`
  display: flex;
  gap: 2rem;
`;

const MenuItem = styled.a`
  padding: 1rem 2rem;
  background-color: #0070f3;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  margin-top: 30px;

  &:hover {
    background-color: #005bb5;
  }
`;

const Homepage = () => {
  return (
    <HomeContainer>
      <h1>Welcome to the Link Sharing App</h1>
      <Menu>
        <Link href="/register" legacyBehavior>
          <MenuItem>Register</MenuItem>
        </Link>
        <Link href="/signin" legacyBehavior>
          <MenuItem>Sign In</MenuItem>
        </Link>
      </Menu>
    </HomeContainer>
  );
};

export default Homepage;
