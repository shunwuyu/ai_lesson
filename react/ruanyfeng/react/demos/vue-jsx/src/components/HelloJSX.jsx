// src/components/HelloJSX.jsx
import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'HelloJSX',
  props: {
    msg: String,
  },
  setup(props) {
    return () => (
      <div class="hello">
        <h1>{props.msg}</h1>
        <p>Welcome to your Vite + Vue + JSX component!</p>
      </div>
    );
  },
});