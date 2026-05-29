import React, { useState } from 'react';
import './index.css';

interface CalendarProps {
  defaultValue?: Date,
  onChange?:(date: Date) => void
}

const InternalCalendar: React.FC<CalendarProps> = (props) => {
  // 有一个 state 来保存当前的日期，默认值是今天
  const {
    defaultValue = new Date(),
    onChange,
  } = props;

  const [date, setDate] = useState(defaultValue)
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  }

  const monthNames = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月'
  ]
  // 多少天
  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  // 第一天是星期几
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  }

  const renderDates = () => {
    const days = [];
    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = () => {
        const curDate = new Date(date.getFullYear(), date.getMonth(), i);
        setDate(curDate);
        console.log(onChange, '//////////');
        // 安全访问对象属性的方法 es2020
        onChange?.(curDate);
      }
      if (i === date.getDate()) {
        days.push(<div key={i} className="day selected" onClick={() => clickHandler()}>{i}</div>)
      } else {
        days.push(<div key={i} className="day" onClick={() => clickHandler()}>{i}</div>);
      } 
    }

    return days;
  }

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>{date.getFullYear()} 年 {monthNames[date.getMonth()]}</div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDates()}
      </div>
    </div>
  );
}

function Test() {
  return <div>
    <InternalCalendar defaultValue={new Date('2025-2-3')} onChange={(date)=> {
          alert(date.toLocaleDateString())
    }}/>
    <InternalCalendar defaultValue={new Date('2023-8-15')}/>
  </div>
}

export default Test;