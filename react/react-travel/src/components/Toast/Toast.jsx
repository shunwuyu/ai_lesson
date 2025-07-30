import React, { useEffect, useState } from 'react'
import styles from './Toast.module.css'
import { toastEvents } from './toastController'

export default function Toast() {
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState({ user: 0, bell: 0, mail: 0 })

  useEffect(() => {
    const show = (info) => {
      setData(info)
      setVisible(true)
      setTimeout(() => setVisible(false), 3000)
    }

    toastEvents.on('show', show)
    return () => toastEvents.off('show', show)
  }, [])

  if (!visible) return null

  return (
    <div className={styles.toastWrapper}>
      <div className={styles.toastItem}>👤 {data.user}</div>
      <div className={styles.toastItem}>🔔 {data.bell}</div>
      <div className={styles.toastItem}>✉️ {data.mail}</div>
      <div className={styles.toastArrow}></div>
    </div>
  )
}
