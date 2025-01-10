<template>
  <Heading :level="3">
    点击验证token <el-button type="primary" @click="invoke">Click</el-button>
    Your Name: {{name}}
  </Heading>
</template>

<script setup>
import Heading from '../components/Heading.jsx'
import {getInfo} from '../api/apis'
import { ref } from 'vue-demi';
import {useRouter} from 'vue-router'
const name = ref("")

const router = useRouter()

async function invoke(){
  try{
    const {data} = await getInfo()
    name.value = data
  }catch{
    router.push('/login')
  }
 
}
</script>