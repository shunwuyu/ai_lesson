import { useTheme } from './ThemeContext'

function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div style={{ marginBottom: 24 }}>
      <h2>当前主题：{theme}</h2>
      <button className="button" onClick={toggleTheme}>
        切换主题
      </button>
    </div>
  )
}

export default Header