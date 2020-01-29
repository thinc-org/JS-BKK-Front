import React from 'react';
import { Onclick } from '../../interfaces/Commons';

interface Props {
  className?: string;
  children?: React.ReactNode;
  type: 'submit' | 'button' | 'reset';
  onClick?: Onclick;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  className,
  type,
  onClick,
  disabled
}) => {
  return (
    <button
      disabled={disabled}
      className={className}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
