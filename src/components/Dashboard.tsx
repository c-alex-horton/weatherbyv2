import React, { useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import styles from '../styles/Dashboard.module.scss'
import WeatherCard from './WeatherCard'

const Dashboard = () => {
  // Locations to render Cards
  const [locations, setLocations] = useState([
    'Austin, TX',
    'Greenville, TX',
    'Denver, CO',
  ])

  const changeLocation = (index: number, newLoc: string) => {
    let array = Array.from(locations)
    array[index] = newLoc
    setLocations(array)
  }
  const addLocation = (newLoc: string) => {
    let array = Array.from(locations)
    array.push(newLoc)
    setLocations(array)
  }
  const removeLocation = (index: number) => {
    let array = Array.from(locations)
    delete array[index]
    setLocations(array)
  }

  const funcs = {
    removeLocation,
    changeLocation,
    addLocation,
  }

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {locations.map((loc, index) => {
          return (
            <WeatherCard
              location={loc}
              key={loc}
              index={index}
              setter={changeLocation}
            />
          )
        })}
        <ReactQueryDevtools />
      </div>
    </main>
  )
}

export default Dashboard
