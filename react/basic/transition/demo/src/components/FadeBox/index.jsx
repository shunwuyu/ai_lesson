import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Fade.css';

function FadeBox() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>切换</button>
      <CSSTransition
        in={show}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="fade-box">Hello, 动画来了</div>
      </CSSTransition>
    </div>
  );
}

export default FadeBox
