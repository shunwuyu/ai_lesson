import "./css/main.css";
import DisplayTodos from "./components/DisplayTodos.jsx";
import Todos from "./components/Todos.jsx";
// React 的动画库，它提供了简单易用的 API 来创建复杂的动画效果
// spring 类型的动画是一种模拟弹簧物理特性的动画类型
import { motion } from "framer-motion";
function App() {
  return (
    <div className="App">
      <motion.h1
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        Todo App
      </motion.h1>
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <Todos />
        <DisplayTodos />
      </motion.div>
    </div>
  );
}

export default App;