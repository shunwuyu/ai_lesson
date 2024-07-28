<template>
<header class="header">
    <div class="header-left">
        <img class="logo" src="../assets/img/logo.svg" />
        <div class="web-title">后台管理系统</div>
        <div class="collapse-btn" @click="collapseChange">
            <el-icon v-if="sidebarStore.collapse">
                <Expand />
            </el-icon>
            <el-icon v-else>
                <Fold />
            </el-icon>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <el-avatar class="user-avatar" :size="30" :src="imgurl">
                </el-avatar>
                <el-dropdown 
                    class="user-name" 
                    trigger="click"
                    @command="handleCommand"
                >
                    <span class="el-dropdown-link">
                        {{username}}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <a>项目仓库</a>
                            <br/>
                            <a>官方文档</a>
                            <el-dropdown-item command="user">
                            个人中心
                            </el-dropdown-item>
                            <el-dropdown-item 
                                divided 
                                command="loginout">
                            退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</header>
</template>
<script lang="ts" setup>
import imgurl from '../assets/img/img.jpg'
import { useSidebarStore } from "../store/sidebar";
import { useRouter } from 'vue-router'
const username = localStorage.getItem('username')
const router = useRouter();
const sidebarStore = useSidebarStore();

const collapseChange = () => {
    sidebarStore.handleCollapse();
}

const handleCommand = (command :string) => {
    if (command == 'loginout') {
        localStorage.removeItem('username');
        router.push('/login')
    } else if (command == 'user'){
        router.push('/ucenter')
    }
}

</script>
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    color: var(--header-text-color);
    background-color: var(--header-bg-color);
    border-bottom: 1px solid #ddd;
}

.header-left {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 100%;
}

.logo {
    width: 35px;
}

.web-title {
    margin: 0 40px 0 10px;
    font-size: 22px;
}

.collapse-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    cursor: pointer;
    opacity: 0.8;
    font-size: 22px;
}

.collapse-btn:hover {
    opacity: 1;
}

.header-right {
    float: right;
    padding-right: 50px;
}

.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}

.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}

.btn-icon {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: var(--header-text-color);
    margin: 0 5px;
    font-size: 20px;
}

.btn-bell-badge {
    position: absolute;
    right: 4px;
    top: 0px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: var(--header-text-color);
}

.user-avator {
    margin: 0 10px 0 20px;
}

.el-dropdown-link {
    color: var(--header-text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
}

.el-dropdown-menu__item {
    text-align: center;
}

</style>