import { useEffect, useRef } from 'react'
import { useImageStore } from '../../store/useImageStore'
import ImageCard from '../ImageCard/ImageCard'
import styles from './Waterfall.module.css'

const Waterfall = () => {
  const { images, fetchMore } = useImageStore()
  const loader = useRef(null)

  useEffect(() => {
    fetchMore() // 初始加载
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchMore()
      }
    })
    if (loader.current) observer.observe(loader.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.column}>
        {images.filter((_, i) => i % 2 === 0).map(img => (
          <ImageCard key={img.id} {...img} />
        ))}
      </div>
      <div className={styles.column}>
        {images.filter((_, i) => i % 2 !== 0).map(img => (
          <ImageCard key={img.id} {...img} />
        ))}
      </div>
      <div ref={loader} className={styles.loader}>加载中...</div>
    </div>
  )
}

export default Waterfall