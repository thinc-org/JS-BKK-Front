import React from 'react';
import { Onclick } from '../../interfaces/Commons';

interface Props {
  className?: string;
  children?: React.ReactNode;
  type: 'submit' | 'button' | 'reset';
  onClick?: Onclick;
}

const Button: React.FC<Props> = ({ children, className, type, onClick }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
