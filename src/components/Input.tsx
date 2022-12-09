import React from 'react'
import styles from '../styles/Input.module.scss'

const Input = ({
  onChange,
  value,
}: {
  onChange: (e: any) => void
  value: string
}) => {
  return (
    <input
      type='text'
      onChange={(e) => onChange(e)}
      className={styles.input}
      value={value}
    />
  )
}

export default Input
