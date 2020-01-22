import React, { useState, useEffect } from 'react';

interface Props {
  className?: string;
}

const getDifference = (d1: Date, d2: Date) => {
  const hours = (d2.getHours() - d1.getHours()) % 24;
  const minutes = (d2.getMinutes() - d1.getMinutes()) % 60;
  const seconds = (d2.getSeconds() - d1.getSeconds()) % 60;
  const res: Date = new Date();
  res.setHours(hours);
  res.setMinutes(minutes);
  res.setSeconds(seconds);
  return res;
};

function padZero(n: string, width: number) {
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

const Countdown: React.FC<Props> = ({ className }) => {

  // Set due date here
  const closeFoodSale: Date = new Date();
  closeFoodSale.setHours(new Date().getHours() + 5);
  closeFoodSale.setMinutes(new Date().getMinutes() + 10);
  closeFoodSale.setSeconds(new Date().getSeconds() + 1);
  // 
  const [time, setTime] = useState<string>();
  const [dueTime] = useState<Date>(closeFoodSale);

  useEffect(() => {
    const stopLoop = setInterval(() => {
      const currentdate = getDifference(new Date(), dueTime);
      setTime(
        `${currentdate.getHours()}:${padZero(
          currentdate.getMinutes().toString(),
          2
        )}:${padZero(currentdate.getSeconds().toString(), 2)}`
      );
    }, 1000);
    return () => clearInterval(stopLoop);
  }, [dueTime]);


  return <div className={`${className}`}>{time}</div>;
};

export default Countdown;
