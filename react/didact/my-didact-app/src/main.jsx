import Didact from './didact.js';

function App() {
  return (
    /** @jsx Didact.createElement */
    <div>
      <h1>Hello Didact</h1>
    </div>
  );
}

const container = document.getElementById("root");
Didact.render(<App />, container);