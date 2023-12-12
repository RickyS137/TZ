import { FC, useState, useEffect, useRef } from 'react';
import ScaleItem from './components/ScaleItem/ScaleItem';
import classes from './Scale.module.scss';

const Scale: FC = () => {
  const scaleData = [0, 1, 11, 21, 31];
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const scaleRef = useRef<HTMLDivElement>(null);

  const handleClick = (n: number) => {
    setIsSelected(n);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (scaleRef.current && !scaleRef.current.contains(event.target as Node)) {
        setIsSelected(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className={classes.main}>
      <span>Меньше</span>
      <div className={classes.scale} ref={scaleRef}>
        {scaleData.map((item, i) => (
          <ScaleItem key={i} num={item} isSelected={isSelected} setIsSelected={handleClick} />
        ))}
      </div>
      <span>Больше</span>
    </div>
  );
};

export default Scale;
