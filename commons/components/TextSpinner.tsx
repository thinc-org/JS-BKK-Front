import { useState, useEffect } from 'react';

const template = '-\\|/';

const TextSpinner: React.FC<{}> = () => {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => f + 1);
    }, 150);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <span className='font-mono'>{template[frame % template.length]}</span>;
};

export default TextSpinner;
