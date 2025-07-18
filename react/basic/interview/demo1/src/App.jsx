import { useState, Component } from 'react'
import './App.css'

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'hello, react!'
    }
    console.log('Constructor');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  handleClick = () => {
    this.setState({ text: 'State updated!' });
  };

  render() {
    console.log('Render');
    return (
      <div>
        <h1>{this.state.text}</h1>
        <button onClick={this.handleClick}>Update State</button>
      </div>
    );
  }
}

function App() {
  const [show, setShow] = useState(true);
  return (
    <>
      {show && <Test a="1" />}
      <button onClick={() => setShow(!show)}>toggle</button>
    </>
  )
}

export default App
