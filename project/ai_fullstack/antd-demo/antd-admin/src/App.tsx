import { Button } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <>
      {/* <Button type="primary">Vite + antd v5 按需加载按钮</Button> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App