import { mergeConfig } from './utils.js'

class Axios {

 constructor(defaultConfig) {
    this.defaultConfig = defaultConfig
 }

/**
 * 
 * @param {string} url 
 * @param {Object} options 
 */
  requiest(url, options) {
    try {
      this._requiest(url, options)
    } catch (error) {

    }
  }
  /**
 * 
 * @param {string} url 
 * @param {Object} options 
 */
  _requiest(url, options) {
    console.log('开始发送请求', url, options)
  }
}

/**
 * 
 * @param {Object} defaultConfig  axios 的基础配置
 */

function createInstance(defaultConfig) {
  // 初始化 axios 实例
  const context = new Axios(defaultConfig)
  const instance = Axios.prototype.requiest.bind(context)
  // 实例上挂手动挂载一个 create 方法
  instance.create = function create(instanceConfig) {
    // 将用户传入的配置和默认配置进行合并
    return createInstance(mergeConfig(defaultConfig, instanceConfig))
  };
  return instance
}

// 基于默认配置,利用工厂函数创建出一个默认的 axios 实例

const axios = createInstance({
  // 默认的网络延迟时间
  timeout: 0,
  // adapter: 默认的适配器配置
  adapter: ["xhr", "http", "fetch"],
  // 基础路径
  beseURL: "",
  headers: {}
});

// 给 axios 添加一系列其他配置

axios.Axios = Axios;
axios.default = axios;

export default axios