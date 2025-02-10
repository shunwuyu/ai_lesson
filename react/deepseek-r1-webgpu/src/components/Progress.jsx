function formatBytes(size) {
  // 到底何单位
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (
    +(size / Math.pow(1024, i)).toFixed(2) * 1 +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}

export default function Progress({ text, percentage, total }) {
  // ECMAScript 2021 (ES12) 逻辑赋值操作符（Nullish Coalescing Assignment Operator）
  // 如果 percentage 是 null 或 undefined，则将其赋值为 0；否则，保持 percentage 的当前值不变。
  percentage ??= 0;
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-700 text-left rounded-lg overflow-hidden mb-0.5">
      <div
        className="bg-blue-400 whitespace-nowrap px-1 text-sm"
        style={{ width: `${percentage}%` }}
      >
        {text} ({percentage.toFixed(2)}%
        {isNaN(total) ? "" : ` of ${formatBytes(total)}`})
      </div>
    </div>
  );
}
