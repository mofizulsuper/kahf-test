// src/app/component/Header.tsx

import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #0070f3;
  color: white;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  
  & > a {
    color: white;
    text-decoration: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  font-size: 1.2rem;

  & > a {
    color: white; 
    text-decoration: none;

    & > :hover {
      text-decoration: underline;
    }
  }
`;

const PreviewButton = styled.button`
  padding: 8px 16px;
  background-color: #e7edc3; /* Button background color */
  color: #0070f3; /* Button text color */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d4db9a; /* Change button color on hover */
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <Link href="/">Kahf</Link>
      </Logo>
      <NavLinks>
        <Link href="/links">Links</Link>
        <Link href="/profile">Profile</Link>
      </NavLinks>
      <PreviewButton>Preview</PreviewButton>
    </HeaderContainer>
  );
};

export default Header;
