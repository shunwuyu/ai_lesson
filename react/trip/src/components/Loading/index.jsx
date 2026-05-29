import React from 'react';
import styles from './loading.module.css'

function Loading()  {
  return (
    <div className={styles.wrapper}>
      <div></div>
      <div></div>
    </div>
  );
}
 
export default React.memo(Loading);