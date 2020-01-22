import React from 'react';

interface PropTypes {
  className?: string;
}

const Card: React.FC<PropTypes> = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-lg p-4 ${className}`}>{children}</div>
  );
};

export default Card;
