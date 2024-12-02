import { ref, onMounted } from 'vue';

interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

// 模拟一个 API 请求函数，返回一个 Promise 泛型
function fetchData<T>(url: string): Promise<ApiResponse<T>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockData = { data: null, status: 200, message: 'Success' };
            resolve(mockData as ApiResponse<T>);
        }, 1000);
    });
}

// 定义一个数据模型
interface User {
    id: number;
    name: string;
}

export default {
    setup() {
        const userData = ref<User | null>(null);
        const error = ref<string | null>(null);

        onMounted(async () => {
            try {
                // 使用泛型来确保返回的数据是 User 类型
                const response = await fetchData<User>('/api/user/1');
                if (response.status === 200) {
                    userData.value = response.data;
                } else {
                    error.value = response.message;
                }
            } catch (e) {
                error.value = 'Failed to fetch data';
            }
        });

        return {
            userData,
            error,
        };
    },
};
