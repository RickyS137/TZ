import { useEffect, useState } from 'react'
import './App.css'
import ContributionGraph, { IContribution } from './components/ContributionGraph/ContributionGraph'

interface IContributionData {
  [date: string]: number;
}

const URL = 'https://dpg.gg/test/calendar.json'

function App() {
  const [data, setData] = useState<IContributionData>({})
  const [parsedData, setParsedData] = useState<IContribution[]>();

  useEffect(() => {
    fetch(URL)
    .then(res => res.json())
    .then(data => {
      setData(data)
    })
    .catch(error => console.error("Ошибка при получении данных:", error));
  },[])
  
  useEffect(() => {
    setParsedData(Object.entries(data).map(([date, count]) => ({ date, count })))        
  },[ data ])

  return (
    <>
      <ContributionGraph contributions={parsedData}/>
    </>
  )
}

export default App
