import React, { FC, useEffect, useState } from 'react'
import Day from './components/Day/Day';
import classes from './ContributionGraph.module.scss'


interface IContribution {
  date: string;
  count: number;
}

interface IContributionGraph {
  contributions: IContribution[];
}

const ContributionGraph: FC<IContributionGraph> = ({contributions}) => {    
  const [weeks, setWeeks] = useState<JSX.Element[][]>([]);

  useEffect(() => {
    const filledContributions = fillMissingDays(contributions);
    const newWeeks: JSX.Element[][] = [];
    let currentWeek: JSX.Element[] = [];

    filledContributions.forEach((contribution, index) => {
      currentWeek.push(
        <td key={index}>
          <Day num={contribution.count} day={contribution.date}/>
        </td>
      );

      if ((index + 1) % 7 === 0 || index === filledContributions.length - 1) {
        newWeeks.push(<tr className={classes.week} key={newWeeks.length}>{currentWeek}</tr>);
        currentWeek = [];
      }
    });

    setWeeks(newWeeks);
  }, [contributions]);

  const fillMissingDays = (data: IContribution[]) => {
    const filledData: IContribution[] = [];
    const currentDate = new Date(data[0]?.date);
    const lastDate = new Date(data[data.length - 1]?.date);

    while (currentDate <= lastDate) {      
      const formattedDate = currentDate.toISOString().split('T')[0];

      const existingContribution = data.find((contribution) => contribution.date === formattedDate);
      const count = existingContribution ? existingContribution.count : 0;

      filledData.push({ date: formattedDate, count });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return filledData;
  };
  
  return (
    <table>
        <tbody className={classes.contributionGraph}>
        {weeks.map((week, index) => (
          <React.Fragment key={index}>{week}</React.Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default ContributionGraph