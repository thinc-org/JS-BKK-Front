import React from 'react';

interface PropTypes {
  className?: string;
  noPadding?: boolean;
  'aria-labelledby'?: string;
  'aria-label'?: string;
  'data-testid'?: string;
  tabIndex?: number;
}

const Card: React.FC<PropTypes> = ({
  children,
  className,
  noPadding,
  tabIndex,
  'aria-labelledby': ariaLabelledby,
  'aria-label': ariaLabel,
  'data-testid': dataTestid
}) => {
  return (
    <div
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      data-testid={dataTestid}
      tabIndex={tabIndex}
      className={`bg-white rounded-lg ${
        noPadding ? 'p-0' : 'p-4'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
