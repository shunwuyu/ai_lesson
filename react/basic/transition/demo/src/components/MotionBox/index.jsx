import { motion } from 'framer-motion';

function MotionBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ background: 'skyblue', padding: 20 }}
    >
      我是有动画的 Box！
    </motion.div>
  );
}


export default MotionBox