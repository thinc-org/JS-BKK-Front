import { useRouter } from 'next/router';
import React, { useEffect, MouseEvent } from 'react';

interface PropTypes {
  href: string;
  prefetch?: boolean;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

const MyLink: React.FC<PropTypes> = ({
  href,
  className,
  children,
  onClick,
  prefetch = true
}) => {
  const router = useRouter();

  useEffect(() => {
    if (prefetch) router.prefetch(href);
  });

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick(e);
    router.push(href);
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

export default MyLink;
