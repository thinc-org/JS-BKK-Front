import React, { MouseEvent } from 'react';

interface PropTypes {
  onClick: (e: MouseEvent) => void;
}

const CloseButton: React.FC<PropTypes> = ({ onClick }) => {
  return <button onClick={onClick}>df</button>;
};

export default CloseButton;
