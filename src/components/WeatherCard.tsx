import React, { useState } from 'react'
import styles from '../styles/WeatherCard.module.scss'
import { NearMe, Close } from '@material-ui/icons'
import calcPercent from '../util/calcPercent'
import { useQuery } from '@tanstack/react-query'
import Input from './Input'
import Button from './Button'
import DayForecast from './DayForecast'
import getAbbr from '../util/getAbbr'

// Mapquest API Key
// const geoKey = process.env.REACT_APP_MAPQUEST
// OpenWeather API Key
const weatherKey = process.env.REACT_APP_WEATHERAPI

const WeatherCard = ({
  location,
  index,
  funcs,
}: {
  location: string
  index: number
  funcs: {
    removeLocation: (loc: string) => void
    changeLocation: (index: number, newLoc: string) => void
    addLocation: (newLoc: string) => void
  }
}) => {
  const [formValue, setFormValue] = useState('')

  // Get weather from lat and lon
  const FetchWeather = async (location: string) => {
    // location = location.replace(/\s/g, '')
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${location}&days=5&aqi=no&alerts=no`
    )
    const data = await res.json()
    return data
  }

  // Fetch weather
  const { isLoading, error, data } = useQuery(
    ['weatherData', location],
    () => FetchWeather(location),
    {
      enabled: !!location,
    }
  )

  // Units (farenheit, celcius, etc)
  const [unit] = useState({ unit: '_f', display: ' F' })

  const handleChange = (e: any) => {
    setFormValue(e.target.value)
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>There was an error... oops...</h1>
  }

  const percent = calcPercent(
    data.forecast.forecastday[0].day[`mintemp${unit.unit}`],
    data.forecast.forecastday[0].day[`maxtemp${unit.unit}`],
    data.current[`temp${unit.unit}`]
  )

  return (
    <div className={styles.card}>
      <div
        className={styles.close}
        aria-label='Remove Location'
        onClick={() => funcs.removeLocation(location)}>
        <Close />
      </div>
      <h1>
        <NearMe />
        {data?.location.name}, {getAbbr(data.location.region)}
      </h1>
      <img
        src={data.current.condition.icon}
        alt={data.current.condition.text}
      />
      {/* <p>{data.current.condition.text}</p> */}

      <h2 className={styles.flex}>
        <span className='material-symbols-rounded'>thermometer</span>
        {Math.floor(data.current[`temp${unit.unit}`])}
        {unit.display}
      </h2>

      <div className={styles.bar}>
        <div className={styles.barFill} style={{ width: percent }} />
      </div>

      <div className={styles.cols}>
        <h3 className={styles.flex}>
          <span className='material-symbols-rounded'>arrow_drop_down</span>
          {Math.round(data.forecast.forecastday[0].day[`mintemp${unit.unit}`])}
          &deg;{unit.display}
        </h3>
        <h3 className={styles.flex}>
          <span className='material-symbols-rounded'>arrow_drop_up</span>
          {Math.round(data.forecast.forecastday[0].day[`maxtemp${unit.unit}`])}
          &deg;{unit.display}
        </h3>
      </div>
      {data.forecast.forecastday.map((e: any, index: any) => {
        if (index === 0) {
          return false
        }
        return <DayForecast data={e} key={index} unit={unit} />
      })}
      <Input onChange={handleChange} value={formValue} />
      <Button onClick={() => funcs.changeLocation(index, formValue)}>
        Submit
      </Button>
    </div>
  )
}

export default WeatherCard
