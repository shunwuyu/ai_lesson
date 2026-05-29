import { defineComponent, h} from 'vue'

export default defineComponent({
  props: {
    level: {
      type: Number,
      require: true
    }
  },

  setup(props, {slots}) {
    // h是createElement 的缩写
    const tag = `h${props.level}`;
    // <tag> 实际上是使用 h 函数动态创建的一个 HTML 标签，而不是一个 Vue 组件。
    // tag 会被渲染为相应的标签
    return () => <tag>{slots.default()}</tag>
  }
})