import styles from './ImageCard.module.css'
import { useEffect, useRef } from 'react'


const ImageCard = ({ url, height }) => {
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || ''
        obs.unobserve(img)
      }
    })
    if (imgRef.current) observer.observe(imgRef.current)
  }, [])

  return (
    <div className={styles.card} style={{ height }}>
      <img ref={imgRef} data-src={url} alt="" className={styles.img} />
    </div>
  )
}

export default ImageCard
