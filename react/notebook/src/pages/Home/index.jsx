// Home/index.jsx
import {useState, useRef} from 'react'
import s from './style.module.less'
import { Icon, Pull } from 'zarm'
import CustomIcon from '@/components/CustomIcon'
import dayjs from 'dayjs'

const Home = () => {
    const typeRef = useRef(); // 账单类型 ref
  const monthRef = useRef(); // 月份筛选 ref
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0)
    const toggle = () => {
        typeRef.current && typeRef.current.show()
      };

    const [currentSelect, setCurrentSelect] = useState({}); // 当前筛选类型
    // 选择月份弹窗
  const monthToggle = () => {
    monthRef.current && monthRef.current.show()
  };
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')); 
  const addToggle = () => {
    addRef.current && addRef.current.show()
  }

  const select = (item) => {
    setRefreshing(REFRESH_STATE.loading);
    setPage(1);
    setCurrentSelect(item)
  }
  const [list, setList] = useState([
    {
        bills: [
          {
            amount: "25.00",
            date: "1623390740000",
            id: 911,
            pay_type: 1,
            remark: "",
            type_id: 1,
            type_name: "餐饮"
          }
        ],
        date: '2021-06-11'
      }

  ]);

  return <div className={s.home}>
  <div className={s.header}>
    <div className={s.dataWrap}>
      <span className={s.expense}>总支出：<b>¥ { totalExpense }</b></span>
      <span className={s.income}>总收入：<b>¥ { totalIncome }</b></span>
    </div>
    <div className={s.typeWrap}>
        <div className={s.left} onClick={toggle}>
          <span className={s.title}>{ currentSelect.name || '全部类型' } <Icon className={s.arrow} type="arrow-bottom" /></span>
        </div>
        <div className={s.right}>
          <span className={s.time} onClick={monthToggle}>{ currentTime }<Icon className={s.arrow} type="arrow-bottom" /></span>
        </div>
    </div>
  </div>
  <div className={s.add} onClick={addToggle}><CustomIcon type='tianjia' /></div>
  {/* <PopupAddBill ref={addRef} onReload={refreshData} /> */}
</div>
}

export default Home