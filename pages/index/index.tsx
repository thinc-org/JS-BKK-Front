import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Home: React.FC = () => {
  const basicStyles = css`
    color: green;
  `;

  const Basic = styled.div`
    ${basicStyles};
  `;
  return (
    <div>
      Home works
      <Basic>GO O</Basic>
    </div>
  );
};

export default Home;
