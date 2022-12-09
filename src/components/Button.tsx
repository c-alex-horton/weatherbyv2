import React from 'react'
import styles from '../styles/Button.module.scss'

type ButtonTypes = {
  children: React.ReactNode
  onClick: () => void
}

const Button = ({ children, onClick }: ButtonTypes) => {
  return (
    <div className={styles.button} onClick={() => onClick()}>
      {children}
    </div>
  )
}

export default Button
