import React from 'react';
import { Onclick } from '../../interfaces/Commons';

interface Props {
  className?: string;
  children?: React.ReactNode;
  type: 'submit' | 'button' | 'reset';
  onClick?: Onclick;
  disabled?: boolean;
  'aria-label'?: string;
}

const Button: React.FC<Props> = ({
  children,
  className,
  type,
  onClick,
  disabled,
  'aria-label': ariaLabel
}) => {
  return (
    <button
      disabled={disabled}
      className={className}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
