import React, { useMemo } from 'react'
import styles from '../styles/DayForecast.module.scss'
import { format } from 'date-fns'

const DayForecast = ({
  data,
  unit,
}: {
  data: any
  unit: { unit: string; display: string }
}) => {
  const date = useMemo(() => {
    const dt = new Date(data.date_epoch * 1000)
    return new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000)
  }, [data])
  return (
    <div className={styles.day}>
      <h3 className={styles.align}>{format(date, 'E')}</h3>
      <div className={styles.icon}>
        <img src={data.day.condition.icon} alt='' />
      </div>
      <div className={styles.align}>
        <span className='material-symbols-rounded'>arrow_drop_down</span>
        {Math.round(data.day[`mintemp${unit.unit}`])}
        &deg;{unit.display}
      </div>
      <div className={styles.align}>
        <span className='material-symbols-rounded'>arrow_drop_up</span>
        {Math.round(data.day[`maxtemp${unit.unit}`])}
        &deg;{unit.display}
      </div>

      {/* <p>{data.main.temp_min}</p>
      <p>{data.main.temp_max}</p> */}
    </div>
  )
}

export default DayForecast
