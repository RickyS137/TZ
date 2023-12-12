import { useState } from 'react'
import ScaleItem from './components/ScaleItem/ScaleItem';
import classes from './Scale.module.scss'


const Scale = () => {
  const scaleData = [0, 1, 11, 21, 31]
  const [isSelected, setIsSelected] = useState<number | null>(null);

  const handleClick = (n: number) => {
    setIsSelected(n)
  }

  return (
    <div className={classes.main}>
      <span>Меньше</span>
      <div className={classes.scale}>
        {scaleData.map((item, i) => (
          <ScaleItem 
          key={i} 
          num={item}
          isSelected={isSelected}
          setIsSelected={handleClick}
          />
        ))}
      </div>
      <span>Больше</span>
    </div>
  )
}

export default Scale