import React from 'react'
import styles from './Spinner.module.scss'

interface Props {
  customStyle?: any
}

const Spinner: React.FC<Props> = ({ customStyle }) => {
  return (
    <div className={`${styles.ldsRing} ${customStyle}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Spinner
