import React from 'react';
import { Swiper } from 'react-vant';
import styles from './banner.module.css';

const BannerSwiper = ({ banners }) => {
  if (!banners || banners.length === 0) {
    return null;
  }
  console.log(styles)
  return (
    <div className={styles.banner}>
      <Swiper autoplay={3000} loop>
        {banners.map((banner) => (
          <Swiper.Item key={banner.id}>
            <div
              className={styles.item}
              onClick={() => {
                // 可以添加跳转逻辑，比如跳转详情页
                // navigate(`/banner/${banner.id}`);
              }}
            >
              <img src={banner.pic} alt={banner.title} className={styles.image} />
              <div className={styles.title}>{banner.title}</div>
            </div>
          </Swiper.Item>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSwiper;