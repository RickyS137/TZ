import { FC, useEffect, useState } from 'react'
import classes from './Day.module.scss'


interface IDay {
  day: string,
  num: number,
  isSelected: string | null,
  setIsSelected: (string: string) => void;
}

const Day: FC<IDay> = ({ num, day, setIsSelected, isSelected }) => {    
  const [isPopoverVisible, setPopoverVisibility] = useState(false);

  useEffect(() => {
    if(isSelected === day){
      setPopoverVisibility(true)
    } else setPopoverVisibility(false)    
  },[ isSelected ])

  const getColor = (number: number) => {
    if(number <= 0) {
      return '#EDEDED'
    } else if (number >= 0 && number <= 9) {
      return '#ACD5F2'
    } else if (number >= 10 && number <= 19) {
      return '#7FA8C9'
    } else if (number >= 20 && number <= 29) {
      return '#527BA0'
    } else if (number >= 30 && number <= 39) {
      return '#254E77'
    }
  } 

  const formattedDate = (s:string) => {
    const dateObject = new Date(s);

  const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const dayOfWeek = daysOfWeek[dateObject.getDay()];
  const month = months[dateObject.getMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();

  return `${dayOfWeek}, ${month} ${day}, ${year}`;
  }

  const handleClick = (day: string) => {    
    setIsSelected(day)    
  }

  return (
    <div
      className={classes.day}
      style={{ backgroundColor: getColor(num) }}
      onClick={() => handleClick(day)}
    >
      {isPopoverVisible && (
        <div className={classes.popover}>
          <span className={classes.title}>{num} Contributions</span>
          <span className={classes.text}>{formattedDate(day)}</span>
          <div className={classes.corner}></div>
        </div>
      )}
    </div>
  )
}

export default Day