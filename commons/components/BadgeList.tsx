import React from 'react';

interface Props {
  id: number | undefined;
  className?: string;
}

const BadgeList: React.FC<Props> = ({ id, className }) => {
  switch (id) {
    case 1:
      return (
        <img
          className={className}
          src='/icons/badges/javascript.svg'
          alt='javascript'
        />
      );
    case 2:
      return (
        <img
          className={className}
          src='/icons/badges/angular.svg'
          alt='angular'
        />
      );
    case 3:
      return (
        <img className={className} src='/icons/badges/react.svg' alt='react' />
      );
    case 4:
      return (
        <img
          className={className}
          src='/icons/badges/nodejs.svg'
          alt='nodejs'
        />
      );
    case 5:
      return (
        <img
          className={className}
          src='/icons/badges/firebase.svg'
          alt='firebase'
        />
      );
    case 6:
      return (
        <img className={className} src='/icons/badges/vue.svg' alt='vue' />
      );
    case 7:
      return (
        <img
          className={className}
          src='/icons/badges/typescript.svg'
          alt='typescript'
        />
      );
    default: {
      return <div>error</div>;
    }
  }
};

export default BadgeList;
