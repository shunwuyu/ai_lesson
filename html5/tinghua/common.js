let data = [
  { value: '周杰伦的听妈妈的话我听了10年', time: 5, color: 'red', speed: 1, fontSize: 22 },
  { value: '快快长大才,能保护她', time: 10, color: '#00a1f5', speed: 1, fontSize: 30 },
  { value: '听妈妈的话晚点再恋爱吧', time: 6 },
  { value: '别让她受伤', time: 20, color: '#fff', speed: 1, fontSize: 30 },
]

//获取页面中的元素
let canvas = document.getElementById('canvas')//获取弹幕画布元素
let ctx = canvas.getContext('2d')//获取绘图的2D渲染上下文
let video = document.getElementById('video')//获取视频元素
let $text = document.getElementById('text')//获取输入弹幕的文本框元素
let $color = document.getElementById('color')//获取颜色选择输入框元素
let $range = document.getElementById('range')//获取滑动输入框元素
let $btn = document.getElementById('btn')//获取发送弹幕按钮元素

//弹幕绘制的准备工作
class CanvasBarrage {
  constructor(canvas, video, opts = {}) {
      if (!canvas || !video) return//如果创建实例对象时没有传入canvas和video参数就会直接返回
      this.canvas = canvas
      this.video = video
      //初始化canvas的尺寸，使其于video的尺寸匹配
      this.canvas.width = video.width
      this.canvas.height = video.height
      this.ctx = canvas.getContext('2d')
      //设置弹幕的默认值
      let defOpts = {
          color: '#e91e63',//默认颜色
          speed: 1, //默认弹幕移动速度
          opacity: 0.5,//默认弹幕透明度
          fontSize: 20,//默认弹幕字体大小
          data: []//默认弹幕数据
      }
      Object.assign(this, defOpts, opts)//合并弹幕的默认值和用户传入的参数
      this.isPaused = true//默认的暂停状态为true
      this.barrages = this.data.map(item => new Barrage(item, this))//创建Barrage实例集合
      this.render()//开始渲染
  }
  //渲染函数，通过requestAnimationFrame实现动画
  render() {
      this.clear()//清除画布
      this.renderBarrages()//绘制弹幕
      //递归调用，直到视频停止播放的时候结束
      if (!this.isPaused) {
          requestAnimationFrame(this.render.bind(this))
      }
  }
  //清理函数，用于清理画布的内容
  clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  //绘制弹幕函数，绘制所有的函数
  renderBarrages() {
      let time = this.video.currentTime//获取到视频的播放时间
      this.barrages.forEach(barrage => {
          // 检查弹幕是否达到出现时间且未结束
          if (time >= barrage.time && !barrage.flag) {
              if (!barrage.isInit) {//没有初始化
                  barrage.init()
                  barrage.isInit = true
              }
              //更新弹幕的位置
              barrage.x -= barrage.speed
              //绘制弹幕
              barrage.render()
              //边界判断，判断弹幕是否移出画布
              if (barrage.x < -barrage.width) {
                  barrage.flag = true
              }
          }
      })
  }
  //添加函数，用于添加新的弹幕到渲染队列
  add(obj) {
      this.barrages.push(new Barrage(obj, this))
  }
}
//弹幕类
class Barrage {
  constructor(obj, context) {
      this.value = obj.value//弹幕内容
      this.time = obj.time//弹幕出现时间
      this.obj = obj//原始数据对象
      this.context = context//引用CanvasBarrage实例
  }
  //初始化弹幕的属性
  init() {
      this.color = this.obj.color || this.context.color//弹幕颜色
      this.speed = this.obj.speed || this.context.speed//弹幕移动速度
      this.opacity = this.obj.opacity || this.context.opacity//弹幕透明度
      this.fontSize = this.obj.fontSize || this.context.fontSize//弹幕字体大小

      //计算每一条弹幕的宽度。通过创建一个p标签，然后将弹幕文本放入p标签中然后获取宽度然后赋值给this.width，然后移除p标签。
      let p = document.createElement('p')
      p.style.fontSize = this.fontSize + 'px'
      p.innerHTML = this.value
      document.body.appendChild(p)
      this.width = p.clientWidth
      document.body.removeChild(p)
      //弹幕的初始位置
      this.x = this.context.canvas.width//画布右侧边缘
      this.y = this.context.canvas.height * Math.random()//随机位置
      //确保弹幕不超过画布的顶部和底部
      if (this.y < this.fontSize) {
          this.y = this.fontSize
      } else if (this.y > this.context.canvas.height - this.fontSize) {
          this.y = this.context.canvas.height - this.fontSize
      }
  }
  //在画布上渲染弹幕
  render() {
      this.context.ctx.fillStyle = this.color
      this.context.ctx.font = `${this.fontSize}px Arial`
      this.context.ctx.fillText(this.value, this.x, this.y)
  }
}
//实例化CanvasBarrage，并处理视频播放事件和发送弹幕按钮的点击事件
let canvasBarrage = new CanvasBarrage(canvas, video, { data: data })
video.addEventListener('play', function () {
  canvasBarrage.isPaused = false//视频播放时将视频暂停状态调整为解除暂停
  canvasBarrage.render()//开始渲染
})
//当用户点击按钮时，根据弹幕内容、出现时间、选择的颜色和字体大小创建新弹幕
$btn.addEventListener('click', () => {
  let value = $text.value
  let time = video.currentTime
  let color = $color.value
  let fontSize = $range.value
  let obj = { value, time, color, fontSize }
  canvasBarrage.add(obj)
})
