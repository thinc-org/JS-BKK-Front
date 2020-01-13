import React from 'react';

interface Props {
  className?: string;
  children?: React.ReactNode;
  type: "submit" | "button" | "reset";
  onClick?:
  | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
  | undefined;
}

const Button: React.FC<Props> = ({ children, className, type, onClick }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
