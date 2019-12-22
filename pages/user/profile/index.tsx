import React, { useMemo } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const UserProfile: React.FC = () => {
  const basicStyles = useMemo(
    () => css`
      color: green;
    `,
    []
  );

  const Basic = styled.div`
    ${basicStyles};
  `;
  return (
    <div css={basicStyles}>
      Home works
      <Basic>GO O</Basic>
    </div>
  );
};

export default UserProfile;
