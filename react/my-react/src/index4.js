import React from 'react';
import ReactDOM from 'react-dom/client';
// tag  , 自定义组件， 属性， 后代
// const element = React.createElement('h1', {className:'title'}, '旅梦开发团')
// console.log(element);
const element = React.createElement('div', {className:'container'}, 
    React.createElement('h1', {className:'title'}, '旅梦开发团')
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(element);
// root.render(<h1>旅梦开发团</h1>);

