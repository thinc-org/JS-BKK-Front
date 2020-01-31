import React, { useState, useEffect, useMemo } from 'react';

interface Props {
  className?: string;
  due: number;
}

function padZero(n: string, width: number) {
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

const Countdown: React.FC<Props> = ({ className, due }) => {
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    setTime(Date.now());
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeLeft = useMemo(() => {
    if (time === null) return '…';
    const difference = Math.floor((due - time) / 1000);
    if (difference < 0) return '00:00:00';
    const seconds = difference % 60;
    const minutes = Math.floor(difference / 60) % 60;
    const hours = Math.floor(difference / 3600) % 24;
    const days = Math.floor(difference / 86400);
    const parts = [
      ...(days > 0 ? [days] : []),
      padZero(`${hours}`, 2),
      padZero(`${minutes}`, 2),
      padZero(`${seconds}`, 2)
    ];
    return parts.join(':');
  }, [time, due]);

  return <div className={`${className}`}>{timeLeft}</div>;
};

export default Countdown;
