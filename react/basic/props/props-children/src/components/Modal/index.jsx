import React from 'react';

export function Modal({ HeaderComponent, FooterComponent, children }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <HeaderComponent />
        <div style={styles.content}>{children}</div>
        <FooterComponent />
      </div>
    </div>
  );
}


const styles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '8px',
    width: '400px',
  },
  content: {
    margin: '1rem 0',
  }
};
