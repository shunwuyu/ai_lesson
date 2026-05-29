// - 只写“移动端”
// export default App = () => {
//   return (
//     <div class="flex flex-col gap-4">
//       <main class="bg-blue-100 p-4">主内容</main>
//       <aside class="bg-green-100 p-4">侧边栏</aside>
//     </div>
//   )
// }
// sm  ≥ 640px
// md  ≥ 768px
// lg  ≥ 1024px
// xl  ≥ 1280px
// - 加桌面端条件（魔法时刻）
export default function App() {
  return (
    <div class="flex flex-col md:flex-row gap-4">
      <main class="bg-blue-100 p-4 md:w-2/3">
        主内容
      </main>
      <aside class="bg-green-100 p-4 md:w-1/3">
        侧边栏
      </aside>
    </div>
  )
}