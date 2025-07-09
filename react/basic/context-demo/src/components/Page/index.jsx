import Child from '../Child'
import { useTheme } from '../../hooks/useTheme'

const Page = () => {
  const theme = useTheme();
  return (
    <>
      <button className={theme}>按钮{theme}</button>
      <Child />
    </>
  )
}

export default Page