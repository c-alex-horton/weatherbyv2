import React, { useState } from 'react'
import styles from '../styles/WeatherCard.module.scss'
import { NearMe } from '@material-ui/icons'
import calcPercent from '../util/calcPercent'
import { useQuery } from '@tanstack/react-query'

const geoKey = process.env.REACT_APP_MAPQUEST
const weatherKey = process.env.REACT_APP_OPENWEATHER

const WeatherCard = ({ location = 'Austin, Tx' }) => {
  const FetchLocation = async (location = 'austin,tx') => {
    location = location.replace(/\s/g, '')

    const res = await fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=${geoKey}&location=${location}`
    )
    const data = await res.json()
    return data.results[0].locations[0]
  }

  const FetchWeather = async (locData: any) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locData.latLng.lat}&lon=${locData.latLng.lng}&units=imperial&appid=${weatherKey}`
    )
    const forcast = await res.json()
    return forcast
  }

  const { data: locData } = useQuery(['locationData', location], () =>
    FetchLocation(location)
  )

  const { isLoading, error, data } = useQuery(
    ['weatherData', locData],
    () => FetchWeather(locData),
    {
      enabled: !!locData,
    }
  )

  const [unit] = useState(' F')

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>There was an error... oops...</h1>
  }

  const percent = calcPercent(
    data.main.temp_min,
    data.main.temp_max,
    data.main.temp
  )

  return (
    <div className={styles.card}>
      <h1>
        <NearMe />
        {locData?.adminArea5}, {locData?.adminArea3}
      </h1>
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather.description}
      />
      <h2 className={styles.flex}>
        <span className='material-symbols-rounded'>thermometer</span>
        {Math.round(data.main.temp)}&deg;{unit}
      </h2>
      <div className={styles.bar}>
        <div className={styles.barFill} style={{ width: percent }} />
      </div>
      <div className={styles.cols}>
        <h3 className={styles.flex}>
          <span className='material-symbols-rounded'>arrow_drop_down</span>
          {Math.round(data.main.temp_min)}&deg;{unit}
        </h3>
        <h3 className={styles.flex}>
          <span className='material-symbols-rounded'>arrow_drop_up</span>
          {Math.round(data.main.temp_max)}&deg;{unit}
        </h3>
      </div>
    </div>
  )
}

export default WeatherCard
