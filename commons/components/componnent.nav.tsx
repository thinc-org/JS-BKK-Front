import React from 'react';
import Link from 'next/link';

const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
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
      </ul>
    </nav>
  );
};

export default Nav;
