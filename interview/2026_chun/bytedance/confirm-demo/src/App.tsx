import { confirm } from './components/Confirm'

export default function App() {
  return <div>App
    <div onClick={() => confirm({ message: 'Are you sure you want to delete this item?' })}>删除</div>
  </div>
}