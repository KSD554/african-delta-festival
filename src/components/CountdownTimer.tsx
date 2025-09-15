import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-12-26T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-hero text-white py-4 px-6 rounded-2xl shadow-festival">
      <div className="text-center">
        <p className="text-sm font-medium mb-2">🔥 Le festival commence dans :</p>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold">{timeLeft.days}</div>
            <div className="text-xs uppercase tracking-wide">Jours</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold">{timeLeft.hours}</div>
            <div className="text-xs uppercase tracking-wide">Heures</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold">{timeLeft.minutes}</div>
            <div className="text-xs uppercase tracking-wide">Min</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold">{timeLeft.seconds}</div>
            <div className="text-xs uppercase tracking-wide">Sec</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;