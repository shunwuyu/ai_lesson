import { showToast } from '../../components/Toast/toastController'
import Toast from '../../components/Toast/Toast.jsx'
import {
  Button
} from 'react-vant';
const Discount = () => {
  return (
    <>
    Discount
      <Button
        type="primary"
        onClick={() =>
          showToast({ user: 21, bell: 9, mail: 205 })
        }
      >
        显示 Toast
      </Button>
      <Toast />
    </>
  )
}

export default Discount