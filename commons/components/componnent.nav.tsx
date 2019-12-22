import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

const Nav: React.FC = () => {
  const List = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  `;
  return (
    <nav>
      <List>
        <li>
          <Link href='/'>
            <a href='tet'>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/login'>
            <a href='tet'>Login</a>
          </Link>
        </li>
        <li>
          <Link href='/user/profile'>
            <a href='tet'>Profile</a>
          </Link>
        </li>
      </List>
    </nav>
  );
};

export default Nav;
