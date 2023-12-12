import {FC, useEffect, useState} from 'react'
import { getColor } from '../../../ContributionGraph/components/Day/Day'
import classes from './ScaleItem.module.scss'

interface IScaleItem {
  isSelected: number | null,
  setIsSelected: (s:number) => void,
  num: number,
}

const ScaleItem: FC<IScaleItem> = ({ setIsSelected, isSelected, num }) => {
  const [isPopoverVisible, setPopoverVisibility] = useState<boolean>(false)

  useEffect(() => {
    if(isSelected === num) {
      setPopoverVisibility(true)
    } else setPopoverVisibility(false)
  },[isSelected])

  const getContributions = (number: number) => {
    if(number <= 0) {
      return 'No contributions'
    } else if (number >= 0 && number <= 9) {
      return '1 - 9 contributions'
    } else if (number >= 10 && number <= 19) {
      return '10 - 19 contributions'
    } else if (number >= 20 && number <= 29) {
      return '20 - 29 contributions'
    } else if (number >= 30 && number <= 39) {
      return '30+ contributions'
    }
  }  

  return (
    <div 
    className={classes.scaleItem} 
    style={{ backgroundColor: getColor(num)}}
    onClick={() => setIsSelected(num)}
    >
      {isPopoverVisible && (
        <div className={classes.popover}>
        <span className={classes.title}>{getContributions(num)}</span>
        <div className={classes.corner}></div>
      </div>
      )}
    </div>
  )
}

export default ScaleItem