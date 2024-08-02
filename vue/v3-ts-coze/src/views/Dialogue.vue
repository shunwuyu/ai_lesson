<template>

    <van-icon name="arrow-left" size="20px" @click="back" />
    <div class="container">


        <van-divider dashed :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            以下为最新消息</van-divider>
        <!-- ai机器人的打招呼 -->
        <div class="container-greet">
            <span style="font-weight: bold;">Hi,我是智能选车助手GearGuideGo</span><br>
            <span style="margin-top: 0.15rem;display: block;">祝愿您能找到心仪的汽车哟。</span>
        </div>



        <!-- 和AI的对话内容 -->
        <ul class="dialogue">

            <li v-for="(msg, index) in messages " :key="index">
                <!-- 没有唯一标识，每次for都会从0到数组长度一直渲染 -->
                <div v-if="msg.type === 'question' && msg.isRaw === true" class="dialogue-question"> {{ msg.content }}
                </div>

                <!-- 判断message的类型，如果是answer类型，则返回true 并将msg解析-->

                <div v-if="msg.type === 'answer' && msg.isRaw === true" class="dialogue-answer__isRaw"> {{
        msg.content }}</div>

                <div v-if="msg.type === 'answer' && msg.isRaw === false" class="dialogue-answer__notRaw">
                    <span class="dialogue-answer__notRaw-content"> {{ msg.content[0] }}</span>
                    <a :href=msg.content[1]>
                        <div class="image">
                            <van-notice-bar scrollable text="点击图片可查看汽车详情哦！" />
                            <img :src=msg.content[2]>
                        </div>
                    </a>

                </div>
            </li>

        </ul>

    </div>



    <div class="inputAndRecommend">
        <ul class="recommendList">
            <li v-for="(item, index) in recommendQuestion" :key="index" @click="recommendClick(item)"
                class="recommendList-item">
                {{ item }}
            </li>
        </ul>

        <van-cell-group>
            <van-field v-model="newQuestion" center clearable placeholder="请输入您的想要的车辆信息和预算">
                <template #button>
                    <van-button size="small" type="primary" @click="submit" v-if="!isLoading">

                        <van-icon name="guide-o" size="1rem" />

                    </van-button>
                    <van-loading vertical v-else>
                        <template #icon>
                            <van-icon name="star-o" size="1rem" />
                        </template>
                        回答生成中...
                    </van-loading>
                </template>
            </van-field>
        </van-cell-group>

        <!-- <input type="text" class="input" placeholder="请输入您的预算与想要车型" v-model="newQuestion"> -->
        <!-- <button @click="submit">发送</button> -->
        <!-- <p v-if="isLoading">回答生成中.......</p> -->
    </div>

</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router'
import { getCozeData } from '@/api/chatCoze.ts'
const router = useRouter();

const back = () => {
    router.back();
}
// 用户提出的问题
const newQuestion = ref<string>("");

// AI回答的原始数据
const ans = reactive<{ data: any, visited: boolean }[]>([]);

// 用于存储问答消息
const messages = reactive<{ type: string, content: any, isRaw?: boolean }[]>([]);
const isLoading = ref<boolean>(false);

// 推荐询问的问题
const recommendQuestion = ref<string[]>([]);

// 判断是不是follow_up类型的返回
const isFollowUp = (temp: { messages: { type: string, content: string }[] }) => {
    recommendQuestion.value = [];
    for (let i = 0; i < temp.messages.length; i++) {
        if (temp.messages[i].type === 'follow_up') {
            recommendQuestion.value.push(temp.messages[i].content);
        }
    }
}

// 提交按钮发送请求到bot
const submit = async () => {
    if (!newQuestion.value.trim()) return; // 确保输入非空

    try {
        const question = newQuestion.value;

        // 将提出的问题推到消息列表中
        messages.push({ type: 'question', content: question, isRaw: true });
        newQuestion.value = ''; // 清空输入框
        isLoading.value = true;

        const temp = await getCozeData(question);
        // console.log(temp, '-----------------------------------');

        isLoading.value = false;

        ans.push({ data: temp.data, visited: false });
        console.log('---数据已添加------');
        // console.log(temp.data);
        isFollowUp(temp.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const recommendClick = (item: string) => {
    newQuestion.value = item;
    submit();
}

// 返回最终回答的数据
const contentAnalyze = (content: string) => {
    const detailIndex = content.indexOf('详情:');
    const photoIndex = content.indexOf('照片:');
    if (detailIndex === -1 || photoIndex === -1) {
        return content;
    }
    const ansContent = content.substring(0, detailIndex).trim();
    const ansDetail = content.substring(detailIndex + 3, photoIndex).trim();
    const ansPicture = content.substring(photoIndex + 3).trim();
    return [ansContent, ansDetail, ansPicture];
}

// 使用 watch 监听 ans 的变化
watch(ans, (newVal: { data: any, visited: boolean }[]) => {
    // 当 ans 的值发生变化时，执行以下代码
    const filteredAns = newVal.filter(item => item && !item.visited);

    // 获取最后一个元素的 messages 数组长度
    const len = filteredAns.length;
    if (len > 0) {
        const lastItemMessages = filteredAns[len - 1].data.messages;

        // 遍历最后一个元素的 messages
        for (let i = 0; i < lastItemMessages.length; i++) {
            if (lastItemMessages[i].type === 'answer') {

                if (contentAnalyze(lastItemMessages[i].content) === lastItemMessages[i].content) {
                    messages.push({ type: 'answer', content: lastItemMessages[i].content, isRaw: true });
                } else {
                    const finalRes = contentAnalyze(lastItemMessages[i].content);
                    messages.push({ type: 'answer', content: finalRes, isRaw: false });
                }

                // 将符合条件的消息添加到 messages
                messages.push({ type: 'answer', content: lastItemMessages[i].content });

                console.log('---------', messages);
            }
        }
    }
}, { deep: true }); // 添加 deep 选项来监听深层属性的变化
</script>

<style lang="less" scoped>
.van-icon-arrow-left {
    position: fixed;
}

.container {
    // background-color: yellow;
    width: 100vw;
    height: 80vh;
    white-space: normal;
    /* 或者使用 pre-wrap 或 pre-line */
    word-wrap: break-word;
    /* 或者使用 overflow-wrap */
    word-break: break-word;
    /* 当需要在单词内部换行时使用 */
    overflow: auto;

    /* 或者使用 hidden 来隐藏溢出内容 */
    .container-greet {
        padding: 0.4rem;
        font-size: 0.4rem;
        color: rgb(48, 46, 72);
        background-color: rgb(237, 240, 245);
        margin-top: 5vh;
        border-radius: 0.5rem;
        width: 70%;
        margin-left: 0.5rem;
    }

    .dialogue {
        margin-top: 0.3rem;
        font-size: 0.5rem;
        overflow-y: scroll;

        .dialogue-question {
            color: white;
            background-color: rgb(10, 171, 251);
            border-radius: 0.2rem 0.2rem 0.2rem 0.2rem;
            padding: 0.3rem;
            margin-right: 1rem;
            width: fit-content;
            margin-left: 1rem;
            margin-top: 0.5rem;
        }

        .dialogue-answer__notRaw {
            margin-top: 0.3rem;

            .dialogue-answer__notRaw-content {
                display: block;
                background-color: rgb(237, 240, 247);
                width: fit-content;
                border-radius: 0.2rem 0.2rem 0.2rem 0.2rem;
                padding: 0.1rem;
                margin-left: 0.6rem;
                margin-right: 1rem;
            }


            a {
                .image {
                    box-sizing: border-box;
                    margin-top: 0.3rem;
                    width: 8rem;
                    height: 5rem;
                    overflow: hidden;
                    margin-left: 0.6rem;
                    cursor: pointer;
                    border-radius: 0.2rem 0.2rem 0.2rem 0.2rem;
                    /* 添加黄色边框 */
                    border: 2px solid yellow;

                    /* 添加黄色边框阴影 */
                    box-shadow: 0 0 0px rgba(255, 255, 0, 0.5);
                    /* 水平偏移，垂直偏移，模糊半径，阴影颜色 */

                    /* 水平偏移，垂直偏移，模糊半径，阴影颜色 */
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .dialogue-answer__isRaw {
            background-color: rgb(237, 240, 247);
            width: fit-content;
            border-radius: 0.2rem 0.2rem 0.2rem 0.2rem;
            padding: 0.1rem;
            margin-left: 0.6rem;
            margin-right: 1rem;
            margin-top: 0.5rem;
        }


    }

}

.inputAndRecommend {
    width: 100vw;
    height: 15vh;

    .recommendList {
        width: 100%;
        height: 2rem;
        overflow-y: scroll;


        .recommendList-item {
            width: fit-content;
            font-size: 0.4rem;
            margin-top: 0.2rem;
            background-color: rgb(208, 231, 252);
            margin-left: 0.6rem;
            margin-right: 0.3rem;
            border-radius: 0.5rem;
            color: black;
        }
    }


}
</style>