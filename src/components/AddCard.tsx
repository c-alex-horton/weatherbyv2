import React, { useState } from 'react'
import styles from '../styles/AddCard.module.scss'
import Button from './Button'
import Input from './Input'

const AddCard = ({
  funcs,
}: {
  funcs: {
    removeLocation: (loc: string) => void
    changeLocation: (index: number, newLoc: string) => void
    addLocation: (newLoc: string) => void
  }
}) => {
  const [value, setValue] = useState('')

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  const handleAdd = () => {
    funcs.addLocation(value)
    setValue('')
  }

  return (
    <div className={styles.addCard}>
      <Input onChange={(e) => handleChange(e)} value={value}></Input>
      <Button onClick={handleAdd}>Add</Button>
    </div>
  )
}

export default AddCard
