import React from 'react';

interface PropTypes {
  className?: string;
  noPadding?: boolean;
  'aria-labelledby'?: string;
}

const Card: React.FC<PropTypes> = ({
  children,
  className,
  noPadding,
  'aria-labelledby': ariaLabelledby
}) => {
  return (
    <div
      aria-labelledby={ariaLabelledby}
      className={`bg-white rounded-lg ${
        noPadding ? 'p-0' : 'p-4'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
