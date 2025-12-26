function ArticleCard() {
  // JSX + Tailwind 样式 = UI 的一部分
  return (
    <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-lg font-bold">Tailwind 入门</h2>
      <p className="text-gray-500 mt-2">
        用 utility class 快速构建 UI
      </p>
    </div>
  )
}

function App() {
  return (
    <>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
      提交
      </button>
      <button className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">
      默认
      </button>
      <div className="p-4 bg-white rounded-xl shadow"></div>
      <ArticleCard />
    </>
  )
}

export default App