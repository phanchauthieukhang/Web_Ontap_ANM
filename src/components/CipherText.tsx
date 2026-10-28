import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface CipherTextProps {
  text: string;
  className?: string;
  duration?: number;
  chars?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const DEFAULT_CHARS = '01ABCDEF#%&*@$[]{}<>';

export const CipherText: React.FC<CipherTextProps> = ({
  text,
  className = '',
  duration = 0.35,
  chars = DEFAULT_CHARS,
  as: Component = 'span',
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [displayText, setDisplayText] = useState<string>(text);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setDisplayText(text);
        return;
      }

      const length = text.length;
      const progressObj = { value: 0 };

      gsap.to(progressObj, {
        value: 1,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
          const progress = progressObj.value;
          const resolvedCount = Math.floor(progress * length);

          let scrambled = '';
          for (let i = 0; i < length; i++) {
            if (i < resolvedCount) {
              scrambled += text[i];
            } else if (text[i] === ' ') {
              scrambled += ' ';
            } else {
              const randChar = chars[Math.floor(Math.random() * chars.length)];
              scrambled += randChar;
            }
          }
          setDisplayText(scrambled);
        },
        onComplete: () => {
          setDisplayText(text);
        },
      });
    },
    { dependencies: [text], scope: containerRef, revertOnUpdate: true }
  );

  return (
    // @ts-expect-error dynamic component type
    <Component ref={containerRef} className={`font-mono transition-colors ${className}`}>
      {displayText}
    </Component>
  );
};
