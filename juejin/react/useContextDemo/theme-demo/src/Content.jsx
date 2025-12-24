function Content() {
  return (
    <div>
      <p>这是一段正文内容</p>
      <Card />
    </div>
  )
}

function Card() {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 8,
        background: 'var(--bg-color)',
        border: '1px solid #ccc'
      }}
    >
      我会跟随主题变化
    </div>
  )
}

export default Content