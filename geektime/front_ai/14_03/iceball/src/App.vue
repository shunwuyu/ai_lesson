<script setup >
  import { ref } from 'vue';
  const imgPreview = ref('https://static001.geekbang.org/resource/image/33/57/33d97daab6609ec998426c4469da4457.png?wh=1090x724');
  
  const status = ref('');
  const imgUrl = ref('');
  const uploadImage = ref(null);
  
  const updateImageData = () => {
    const input = uploadImage.value;
    if (!input.files || input.files.length === 0) {
      return;
    }
  
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      imgPreview.value = e.target?.result;
    };
  }
  
  const patToken = import.meta.env.VITE_PAT_TOKEN;
  const uploadUrl = 'https://api.coze.cn/v1/files/upload';
  const workflowUrl = 'https://api.coze.cn/v1/workflow/run';
  const workflow_id = '7584046119865974834';
  
  const uploadFile = async () => {
    const formData = new FormData();
    const input = uploadImage.value;
    if (!input.files || input.files.length <= 0) return;
    formData.append('file', input.files[0]);
  
    const res = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${patToken}`,
      },
      body: formData,
    });
  
    const ret = await res.json();
    if (ret.code !== 0) {
      status.value = ret.msg;
      return;
    }
  
    return ret.data.id;
  }
  
  const style = ref('写实');
  const uniform_number = ref(10);
  const uniform_color = ref('红');
  const position = ref(0);
  const shooting_hand = ref(1);
  
  const generate = async () => {
    status.value = '图片上传中...';
    const file_id = await uploadFile();
    if (!file_id) return;
    status.value = '图片上传成功，正在生成...'
  
    const parameters = {
      picture: JSON.stringify({
        file_id,
      }),
      style: style.value,
      uniform_number: uniform_number.value, //队服编号
      uniform_color: uniform_color.value, // 队服颜色
      position: position.value, // 0-守门员，1-前锋，2-后卫
      shooting_hand: shooting_hand.value, // 0-左手，1-右手
    };
  
    const res = await fetch(workflowUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${patToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workflow_id,
        parameters,
      }),
    });
  
    const ret = await res.json();
    console.log(ret);
    if (ret.code !== 0) {
      status.value = ret.msg;
      return;
    }
    const data = JSON.parse(ret.data);
    status.value = '';
    imgUrl.value = data.data;
  }
  </script>
  
  <template>
    <div class="container">
      <div class="input">
        <div class="file-input">
  
          <input ref="uploadImage" type="file" id="image" name="image" accept="image/*" required
            @change="updateImageData" />
        </div>
        <img class="preview" :src="imgPreview" alt="preview" />
        <div class="settings">
          <div class="selection">
            <label>队服编号：</label>
            <input v-model="uniform_number" type="number" value="10" />
          </div>
          <div class="selection">
            <label>队服颜色：</label>
            <select v-model="uniform_color">
              <option value="红">红</option>
              <option value="蓝">蓝</option>
              <option value="绿">绿</option>
              <option value="白">白</option>
              <option value="黑">黑</option>
            </select>
          </div>
        </div>
        <div class="settings">
          <div class="selection">
            <label>位置：</label>
            <select v-model="position">
              <option value="0">守门员</option>
              <option value="1">前锋</option>
              <option value="2">后卫</option>
            </select>
          </div>
          <div class="selection">
            <label>持杆：</label>
            <select v-model="shooting_hand">
              <option value="0">左手</option>
              <option value="1">右手</option>
            </select>
          </div>
          <div class="selection">
            <label>风格：</label>
            <select v-model="style">
              <option value="写实">写实</option>
              <option value="乐高">乐高</option>
              <option value="国漫">国漫</option>
              <option value="日漫">日漫</option>
              <option value="油画">油画</option>
              <option value="涂鸦">涂鸦</option>
              <option value="素描">素描</option>
            </select>
          </div>
        </div>
        <div class="generate"><button @click="generate">生成</button></div>
      </div>
      <div class="output">
        <div class="generated">
          <img v-if="imgUrl" :src="imgUrl" />
          <div v-if="status">{{ status }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
    height: 100vh;
    font-size: .85rem;
  }
  
  .preview {
    max-width: 300px;
    margin-bottom: 20px;
  }
  
  .settings {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
    margin-top: 1rem;
  }
  
  .selection {
    width: 100%;
    text-align: left;
  }
  
  .selection input {
    width: 50px;
  }
  
  .input {
    display: flex;
    flex-direction: column;
    min-width: 330px;
  }
  
  .file-input {
    display: flex;
    margin-bottom: 16px;
  }
  
  .output {
    margin-top: 10px;
    min-height: 300px;
    width: 100%;
    text-align: left;
  }
  
  button {
    padding: 10px;
    min-width: 200px;
    margin-left: 6px;
    border: solid 1px black;
  }
  
  .generate {
    width: 100%;
    margin-top: 16px;
  }
  
  .generated {
    width: 400px;
    height: 400px;
    border: solid 1px black;
    position: relative;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
  }
  
  .output img {
    width: 100%;
  }
  </style>