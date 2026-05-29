export default function Progress({ text, percentage }) {
  // 空值合并赋值运算符  ES2021 
  // percentage = percentage ?? 0; 相当于 ES2020 
  // 当 percentage 为 null 或 undefined 时，将其赋值为 0，否则保持原值不变。
    percentage ??= 0; 
    return (
      <div className="relative text-black bg-white rounded-lg text-left overflow-hidden">
        {/* w-[1%] 是 Tailwind CSS 的任意值语法。 */}
        {/* Tailwind 的方括号语法 [value] 允许你使用任意值 */}
        {/* 500 是中等深度的蓝色 */}
        {/* 文本内容不会换行，会在一行内显示 */}
        <div className='px-2 w-[1%] h-full bg-blue-500 whitespace-nowrap' style={{ width: `${percentage}%` }}>
          {text} ({`${percentage.toFixed(2)}%`})
        </div>
      </div>
    );
  }