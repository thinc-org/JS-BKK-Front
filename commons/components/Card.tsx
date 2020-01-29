import React from 'react';

interface PropTypes {
  className?: string;
  noPadding?: boolean;
}

const Card: React.FC<PropTypes> = ({ children, className, noPadding }) => {
  return (
    <div
      className={`bg-white rounded-lg max-h-75vh ${
        noPadding ? 'p-0' : 'p-4'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
