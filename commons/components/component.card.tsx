import React from 'react';

interface Props {
  className?: string;
  children?: React.ReactNode;
  items?: string[];
  childrenClassName?: string;
}

const Card: React.FC<Props> = ({ children, className, items, childrenClassName }) => {
  const listItems = items?.map(item => 
    <p className="py-2"> {item} </p>
  );

  return (
    <div className={`${className} p-4 bg-white text-base rounded`}>
      {listItems}
      <div className={ childrenClassName }>
        {children}
      </div>
    </div>
  );
};

export default Card;
