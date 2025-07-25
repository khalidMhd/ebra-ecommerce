import { useEffect, useState } from 'react';

export function useCountdown(initial = { days: 2, hours: 12, minutes: 45, seconds: 4 }) {
  const [timer, setTimer] = useState(initial);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          minutes = 59;
          seconds = 59;
          hours--;
        } else if (days > 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
          days--;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return timer;
}
