import './App.css'
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
// 轻量级的 JavaScript 日期处理库，它提供了简单、易用的 API 来解析、验证、操作和显示日期和时间
import type { Dayjs } from 'dayjs';



function App() {
  const { token } = theme.useToken();
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <>
      <div style={wrapperStyle}>
        <Calendar onSelect={(date, { source }) => {
          console.log(source, date)
          if (source === 'date') {
            console.log('Panel Select:', source);
          }
        }} />
      </div>
    </>
  )
}

export default App
