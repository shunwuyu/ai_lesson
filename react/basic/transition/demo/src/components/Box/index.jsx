import React, { useState } from 'react';
import styles from './Box.module.css';

function Box() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        {open ? '收起' : '展开'}
      </button>
      <div className={`${styles.box} ${open ? styles.open : ''}`} />
    </div>
  );
}

export default Box