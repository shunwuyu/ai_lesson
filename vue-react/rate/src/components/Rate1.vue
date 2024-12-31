<!-- <template>
  <div>
      {{rate}}
  </div>
</template>

<script setup>
import { defineProps,computed } from 'vue';
let props = defineProps({
  value: Number
})
let rate = computed(()=>"★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value))
</script> -->

<!-- <template>
  <div :style="fontstyle">
      {{rate}}
  </div>
</template>

<script setup>
import { defineProps,computed, } from 'vue';
let props = defineProps({
  value: Number,
  theme:{type:String,default:'orange'}
})
console.log(props)
let rate = computed(()=>"★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value))

const themeObj = {
'black': '#00',
'white': '#fff',
'red': '#f5222d',
'orange': '#fa541c',
'yellow': '#fadb14',
'green': '#73d13d',
'blue': '#40a9ff',
}
const fontstyle = computed(()=> {
  return `color:${themeObj[props.theme]};`
})

</script> -->

<template>
  <div :style="fontstyle">
      <div class='rate' @mouseout="mouseOut">
        <span @mouseover="mouseOver(num)"  v-for='num in 5' :key="num">☆</span>
        <span class='hollow' :style="fontwidth">
          <span @click="onRate(num)" @mouseover="mouseOver(num)" v-for='num in 5' :key="num">★</span>
        </span>
      </div> 
  </div>
  </template>
  <script setup>
  import { ref } from 'vue'
  import { defineProps,computed,defineEmits } from 'vue';
let props = defineProps({
  value: Number,
  theme:{type:String,default:'orange'}
})
console.log(props)
let rate = computed(()=>"★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value))

const themeObj = {
'black': '#00',
'white': '#fff',
'red': '#f5222d',
'orange': '#fa541c',
'yellow': '#fadb14',
'green': '#73d13d',
'blue': '#40a9ff',
}
const fontstyle = computed(()=> {
  return `color:${themeObj[props.theme]};`
})
  // ...其他代码
  // 评分宽度
  let width = ref(props.value)
  function mouseOver(i){
      width.value = i 
  }
  function mouseOut(){
      width.value = props.value
  }
  const fontwidth = computed(()=>`width:${width.value}em;`)
  let emits = defineEmits('update-rate')
  function onRate(num){ emits('update-rate',num)}
  </script>
  
  <style scoped>
  .rate{
    position:relative;
    display: inline-block;
  }
  .rate > span.hollow {
    position:absolute;
    display: inline-block;
    top:0;
    left:0;
    width:0;
    overflow:hidden;
  }
  </style>