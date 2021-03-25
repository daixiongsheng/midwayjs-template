import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

export interface ILogoProps {
  image?: string
  text?: string
  url?: string
}

export default function Logo({ image, url }: ILogoProps) {
  return (
    <div className="logo">
      <Link to={url || '/'} className={styles.logo}>
        {image && <img src={image} alt="logo" />}
      </Link>
    </div>
  )
}
