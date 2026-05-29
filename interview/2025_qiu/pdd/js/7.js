function App({show}) {
  if (show) {           // ❌ 条件成立时才调用
    useState(0);
  }
  useEffect(() => {}, []);
  return <div />;
}


function App({show}) {
  const [count] = useState(0); // 始终第1个
  useEffect(() => {}, []);     // 始终第2个
  return show ? <div>{count}</div> : null;
}
