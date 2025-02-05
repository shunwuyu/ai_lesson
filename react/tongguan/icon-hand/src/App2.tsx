import {
  SyncOutlined,
  SmileOutlined
} from '@ant-design/icons'

function App() {

  return (
    <>
      <SyncOutlined/>
      {/* props 旋转 */}
      <SyncOutlined spin/>
      <SmileOutlined rotate={180}/>
    </>
  )
}

export default App
