import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import styles from '../styles/Dashboard.module.scss'
import WeatherCard from './WeatherCard'

const Dashboard = () => {
  return (
    <main className={styles.main}>
      <WeatherCard />
      <WeatherCard location='roundrock, tx' />
      <ReactQueryDevtools />
    </main>
  )
}

export default Dashboard
