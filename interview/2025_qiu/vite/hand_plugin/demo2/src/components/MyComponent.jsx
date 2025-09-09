// 现在：无需 import，直接使用！
function MyComponent() {
    const [count, setCount] = useState(0);     // ✅ 自动导入
    // const navigate = useNavigate();            // ✅ 自动导入
  
    useEffect(() => {                          // ✅ 自动导入
      console.log('mounted');
    }, []);
    return (
        <>
            MyComponent
        </>
    )
  }

export default MyComponent;