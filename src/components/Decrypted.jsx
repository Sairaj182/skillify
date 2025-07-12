import { useEffect, useState } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export default function DecryptedText({ text, speed = 50, delay = 0 }) {
  const [displayText, setDisplayText] = useState('');
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, i) => {
              if (i < iteration) return text[i];
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join('');
        });

        setIteration((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            setDisplayText(text); // ✅ explicitly show final text
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return <span>{displayText}</span>;
}