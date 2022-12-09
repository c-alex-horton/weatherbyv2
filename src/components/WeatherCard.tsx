import React, { useState } from 'react'
import styles from '../styles/WeatherCard.module.scss'
import { NearMe, Close } from '@material-ui/icons'
import calcPercent from '../util/calcPercent'
import { useQuery } from '@tanstack/react-query'
import Input from './Input'
import Button from './Button'
import DayForecast from './DayForecast'

// Mapquest API Key
const geoKey = process.env.REACT_APP_MAPQUEST
// OpenWeather API Key
const weatherKey = process.env.REACT_APP_OPENWEATHER

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
  // Turn Location string into latitude and Longitude
  const FetchLocation = async (location = 'austin,tx') => {
    location = location.replace(/\s/g, '')

    const res = await fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=${geoKey}&location=${location}`
    )
    const data = await res.json()
    return data.results[0].locations[0]
  }

  // Get weather from lat and lon
  const FetchWeather = async (locData: any) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${locData.latLng.lat}&lon=${locData.latLng.lng}&units=imperial&appid=${weatherKey}`
    )
    const data = await res.json()
    return data.list
  }

  // Fetch Location
  const { data: locData } = useQuery(['locationData', location], () =>
    FetchLocation(location)
  )

  // Fetch weather when locData in not unidentified
  const { isLoading, error, data } = useQuery(
    ['weatherData', locData],
    () => FetchWeather(locData),
    {
      enabled: !!locData,
    }
  )

  // Units (farenheit, celcius, etc)
  const [unit] = useState(' F')

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
    data[0].main.temp_min,
    data[0].main.temp_max,
    data[0].main.temp
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
        {locData?.adminArea5}, {locData?.adminArea3}
      </h1>
      <img
        src={`http://openweathermap.org/img/wn/${data[0].weather[0].icon}@2x.png`}
        alt={data[0].weather.description}
      />
      <h2 className={styles.flex}>
        <span className='material-symbols-rounded'>thermometer</span>
        {Math.round(data[0].main.temp)}&deg;{unit}
      </h2>
      <div className={styles.bar}>
        <div className={styles.barFill} style={{ width: percent }} />
      </div>
      <div className={styles.cols}>
        <h3 className={styles.flex}>
          <span className='material-symbols-rounded'>arrow_drop_down</span>
          {Math.round(data[0].main.temp_min)}&deg;{unit}
        </h3>
        <h3 className={styles.flex}>
          <span className='material-symbols-rounded'>arrow_drop_up</span>
          {Math.round(data[0].main.temp_max)}&deg;{unit}
        </h3>
      </div>
      {data.map((e: any, index: any) => {
        return <DayForecast data={e} key={index} />
      })}
      <Input onChange={handleChange} value={formValue} />
      <Button onClick={() => funcs.changeLocation(index, formValue)}>
        Submit
      </Button>
    </div>
  )
}

export default WeatherCard
