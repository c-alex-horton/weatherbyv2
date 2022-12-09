import React from 'react'
import styles from '../styles/DayForecast.module.scss'
import { format } from 'date-fns'

const DayForecast = ({ data }: { data: any }) => {
  return (
    <div className={styles.day}>
      {format(new Date(data.dt * 1000), 'MMM d')}
      <p>{data.main.temp_min}</p>
      <p>{data.main.temp_max}</p>
    </div>
  )
}

export default DayForecast
