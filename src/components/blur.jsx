import { useEffect, useState } from 'react';

export default function BlurredText({ text, speed = 100, delay = 0 }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return (
    <span className="blur-container">
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={`blur-char ${i < visibleCount ? 'visible' : ''}`}
        >
          {char}
        </span>
      ))}
    </span>
  );
}