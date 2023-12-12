import React, { FC, useEffect, useState } from 'react';
import Day from './components/Day/Day';
import classes from './ContributionGraph.module.scss';

export interface IContribution {
  date: string;
  count: number;
}

interface IContributionGraph {
  contributions?: IContribution[];
}

const ContributionGraph: FC<IContributionGraph> = ({ contributions }) => {  
  const [months, setMonths] = useState<string[]>([])
  const [weeks, setWeeks] = useState<JSX.Element[][]>([]);
  const [isSelected, setIsSelected] = useState<string | null>(null);

  const handleSelect = (string: string) => {
    setIsSelected(string)
  }
  
  useEffect(() => {
    const uniqueMonths = getUniqueMonths(contributions!);
    setMonths(uniqueMonths);
  }, [contributions]);

  const getUniqueMonths = (data: IContribution[]): string[] => {
    const uniqueMonths: Set<string> = new Set();    
  
    data?.forEach((contribution) => {
      const year = new Date(contribution?.date).getFullYear();
      const month = getMonthName(contribution?.date);
  
      if (year === 2023 || (month !== 'Октябрь' && year === 2022)) {
        uniqueMonths.add(month);
      }
    });
  
    return Array.from(uniqueMonths);
  };
  
  

  const getMonthName = (dateString: string): string => {
    const date = new Date(dateString);
    const monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    return monthNames[date.getMonth()];
  };

  useEffect(() => {
    const filledContributions = fillMissingDays(contributions!);
    const newWeeks: JSX.Element[][] = [];
    let currentWeek: JSX.Element[] = [];

    Array.from({ length: filledContributions.length }, (_, index) => {
      const contribution = filledContributions[index];
      currentWeek.push(
        <td key={index}>
          <Day num={contribution.count} day={contribution.date} isSelected={isSelected} setIsSelected={handleSelect}/>
        </td>
      );

      if ((index + 1) % 7 === 0 || index === filledContributions?.length - 1) {
        newWeeks.push(<tr className={classes.week} key={newWeeks.length}>{currentWeek}</tr>);
        currentWeek = [];
      }
    });

    setWeeks(newWeeks);
  }, [contributions, isSelected]);

  const fillMissingDays = (data: IContribution[]) => {
    const filledData: IContribution[] = [];
    const currentDate = new Date(data?.[0]?.date);
    const lastDate = new Date(data?.[data.length - 1]?.date);
    let maxAttempts = 7

    while (currentDate.getDay() !== 1 && maxAttempts > 0) {
      currentDate.setDate(currentDate.getDate() - 1);
      maxAttempts--;
    }
    
    if (maxAttempts === 0) {
      return false;
    }

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
      <thead>
        <tr className={classes.months}>
          {months.map((month, i) => (
            <td key={i}>{
              month.length > 4
              ?
              `${month.slice(0,3)}.`
              :
              month
              }</td>
          ))}
        </tr>
      </thead>
      <tbody className={classes.contributionGraph}>
        <tr className={classes.daysOfWeek}>
          <td>Пн</td>
          <td>Ср</td>
          <td>Пт</td>
        </tr>
        {weeks.map((week, i) => (
          <React.Fragment key={i}>{week}</React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ContributionGraph;