import {
  useRef,
  useEffect
} from 'react';

function App() {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return <input ref={inputRef} />
}

export default App