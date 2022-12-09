import React, { useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import styles from '../styles/Dashboard.module.scss'
import WeatherCard from './WeatherCard'
import AddCard from './AddCard'

const Dashboard = () => {
  // Locations to render Cards
  // ? Make this a hash?
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
  const removeLocation = (loc: string) => {
    let array = Array.from(locations)

    setLocations(array.filter((e) => e !== loc))
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
            <WeatherCard location={loc} key={loc} index={index} funcs={funcs} />
          )
        })}
        <AddCard funcs={funcs} />
      </div>
      <ReactQueryDevtools />
    </main>
  )
}

export default Dashboard
