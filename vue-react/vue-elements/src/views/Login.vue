<template>
  <el-form
    style="position: absolute; left: 45%; "
    ref="formRef"
    :model="form"
    label-width="auto"
  >
    <el-form-item label="用户名">
      <el-input v-model="form.name" size="small"/>
    </el-form-item>

     <el-form-item label="密码">
      <el-input v-model="form.password" type="password" size="small"/>
    </el-form-item>
   
    <el-form-item>
      <el-button
        type="primary"
        @click="onSubmit"
        :loading="loading"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
  import { ref, reactive, toRefs } from 'vue'
  import {login} from '../api/apis'
  import { Message } from 'element3'
  import {useRouter} from 'vue-router'
  
  const formRef = ref(null)
  const loading = ref(false)
  const form = reactive({
      name: '',
      password: ''
  })
  const router = useRouter()

  const onSubmit = async () => {
    loading.value = true
    try{
      const res = await login(form)
      console.log(res);
      router.replace('/')
    }catch(error){
      Message({
        type: 'warning',
        message: error
      })
    }finally{
      loading.value = false
    }
  }

      
    
</script>