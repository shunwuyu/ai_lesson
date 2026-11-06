/** Knowledge Hub 品牌标：中心节点向外辐射，表示知识汇聚 */
// VG 是矢量图形格式，基于 XML 描述图形，放大不失真，适合图标、图表。
export function BrandLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ display: 'block', flexShrink: 0 }}
    >
      <rect width="32" height="32" rx="8" fill="#1677ff" />
      <path
        d="M16 12.6V8.6M19.1 17.8l3.9 2.2M12.9 17.8L9 20"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3.4" fill="#fff" />
      <circle cx="16" cy="7.2" r="2" fill="#69b1ff" />
      <circle cx="24.8" cy="21.2" r="2" fill="#69b1ff" />
      <circle cx="7.2" cy="21.2" r="2" fill="#69b1ff" />
      <circle cx="16" cy="7.2" r="1.15" fill="#fff" />
      <circle cx="24.8" cy="21.2" r="1.15" fill="#fff" />
      <circle cx="7.2" cy="21.2" r="1.15" fill="#fff" />
    </svg>
  )
}
