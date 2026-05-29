import { useEffect, useState } from "react";

async function queryData() {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(666);
    }, 2000);
  })
  return data;
}

function App() {
  const [num, setNum] = useState(0);

  // useEffect(() => {
  //   console.log('xxx')
  //   queryData().then(data => {
  //     setNum(data);
  //   })
  // },[1, 2, 3, 'xxx', Date.now()]);
  useEffect(() => {
    console.log('effect')
    const timer = setInterval(() => {
      console.log(num)
    }, 1000)
    return () => {
      console.log('clean up')
      clearInterval(timer)
    }
  }, [num])
  return (
    <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
  );
}

export default App;

