import { FC } from 'react'
import classes from './Day.module.scss'


interface IDay {
  day: string,
  num: number
}

const Day: FC<IDay> = ({ num}) => {    

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

  return (
    <div className={classes.day} style={{backgroundColor: getColor(num)}}>
        <div
          className={`day-value ${num > 0 ? 'active' : 'inactive'}`}
        >
          {num}
        </div>
    </div>
  )
}

export default Day