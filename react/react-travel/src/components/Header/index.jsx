import React from 'react';
import { NavBar } from 'react-vant';
import styles from './Header.module.css';

const Header = ({ title = '标题', onBack }) => {

  return (
    <div className={styles.headerWrapper}>
      {/* {title} */}
      <NavBar
        className={styles.navbar}
      >
        {title || ""}
      </NavBar>
    </div>
  );
};

export default Header;
