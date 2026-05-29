import React, { useState, useRef, useEffect } from 'react'
import { Icon } from 'zarm'
import s from './style.module.less'
import BillItem from '@/components/BillItem'
import PopupType from '@/components/PopupType'
import dayjs from 'dayjs'
import { get, REFRESH_STATE, LOAD_STATE } from '@/utils'

const Home = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')); // 当前筛选时间
  const [page, setPage] = useState(1); // 分页
  const [totalExpense, setTotalExpense] = useState(0); // 总支出
  const [totalIncome, setTotalIncome] = useState(0); // 总收入
  const [totalPage, setTotalPage] = useState(0); // 分页总数
  const typeRef = useRef(); // 账单类型 ref
  const [currentSelect, setCurrentSelect] = useState({}); // 当前筛选类型
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal); // 下拉刷新状态
  const [loading, setLoading] = useState(LOAD_STATE.normal); // 上拉加载状态

  const [list, setList] = useState([
    // {
    //   bills: [
    //     {
    //       amount: "25.00",
    //       date: "1623390740000",
    //       id: 911,
    //       pay_type: 1,
    //       remark: "",
    //       type_id: 1,
    //       type_name: "餐饮"
    //     }
    //   ],
    //   date: '2021-06-11'
    // }
  ]); // 账单列表
  // console.log(list.length)
  // 添加账单弹窗
  const toggle = () => {
    typeRef.current && typeRef.current.show()
  };

  // 筛选类型
  const select = (item) => {
    console.log(item, '-------------------');
    setRefreshing(REFRESH_STATE.loading);
    // 触发刷新列表，将分页重制为 1
    setPage(1);
    setCurrentSelect(item)
  }

  const getBillList = async () => {
    const { data } = await get(`/bill/list?date=${currentTime}&type_id=${currentSelect.id || 'all'}&page=${page}&page_size=5`);
    // console.log(data)
    // 下拉刷新，重制数据
    if (page == 1) {
      setList(data.list);
    } else {
      setList(list.concat(data.list));
    }
    setTotalExpense(data.totalExpense.toFixed(2));
    setTotalIncome(data.totalIncome.toFixed(2));
    setTotalPage(data.totalPage);
    // 上滑加载状态
    setLoading(LOAD_STATE.success);
    setRefreshing(REFRESH_STATE.success);
  }

  useEffect(() => {
    getBillList() // 初始化
  }, [page, currentSelect, currentTime])

  return <div className={s.home}>
    <div className={s.header}>
      <div className={s.dataWrap}>
        <span className={s.expense}>总支出：<b>¥ 200</b></span>
        <span className={s.income}>总收入：<b>¥ 500</b></span>
      </div>
      <div className={s.typeWrap}>
        <div className={s.left} onClick={toggle}>
          <span className={s.title}>{ currentSelect.name || '全部类型' } <Icon className={s.arrow} type="arrow-bottom" /></span>
        </div>
        <div className={s.right}>
          <span className={s.time}>{currentTime}<Icon className={s.arrow} type="arrow-bottom" /></span>
        </div>
      </div>
    </div>
    <div className={s.contentWrap}>
      {
        list.map((item, index) => <BillItem key={item.date} bill={item}/>)
      }
    </div>
    <PopupType ref={typeRef} onSelect={select} />
  </div>
}

export default Home
