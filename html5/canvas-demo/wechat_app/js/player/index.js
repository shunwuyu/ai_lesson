import Sprite   from '../base/sprite'
import Bullet   from './bullet'
import DataBus  from '../databus'
import Animation from '../base/animation'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/hero.png'
const PLAYER_WIDTH   = 80
const PLAYER_HEIGHT  = 80

let databus = new DataBus()



export default class Player extends Animation{
  
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = screenHeight - this.height - 30

    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false
    this.bullets = []

    //初始化玩家血量
    this.hp=5
    //设计模式参数
    this.shoot_mode=0
    // 初始化事件监听
    this.initEvent()
    this.initExplosionAnimation()
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在飞机上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 30

    return !!(   x >= this.x - deviation
              && y >= this.y - deviation
              && x <= this.x + this.width + deviation
              && y <= this.y + this.height + deviation  )
  }
  
  //检测hp是否归零
  checkIsDestroyed(){
    return this.hp;
  }
  hurt(num){
    this.hp-=num;
  }
  
  /**
   * 根据手指的位置设置飞机的位置
   * 保证手指处于飞机中间
   * 同时限定飞机的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    let disX = x - this.width / 2
    let disY = y - this.height / 2

    if ( disX < 0 )
      disX = 0

    else if ( disX > screenWidth - this.width )
      disX = screenWidth - this.width

    if ( disY <= 0 )
      disY = 0

    else if ( disY > screenHeight - this.height )
      disY = screenHeight - this.height

    this.x = disX
    this.y = disY
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      //
      if ( this.checkIsFingerOnAir(x, y) ) {
        this.touched = true

        this.setAirPosAcrossFingerPosZ(x, y)
      }

    }).bind(this))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      if ( this.touched )
        this.setAirPosAcrossFingerPosZ(x, y)

    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      this.touched = false
    }).bind(this))
  }
  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX  = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }
  /**
   * 玩家射击操作
   * 射击时机由外部决定
   */
  //可以在此自定义子弹的射击模式
  shoot() {
    if(this.shoot_mode==0){
      let bullet = databus.pool.getItemByClass('bullet', Bullet)
      bullet.init(
        this.x + this.width / 2 - bullet.width / 2,
        this.y - 10,
        10
      )
    databus.bullets.push(bullet)
    }
    else if(this.shoot_mode==3){
        this.shoot_3()
    }
  }

  //新增三发连射 
  shoot_3() {
    let bullet_1 = databus.pool.getItemByClass('bullet_1', Bullet)

    bullet_1.init(
      this.x + this.width / 2 - bullet_1.width / 2,
      this.y - 10,
      10
    )

    databus.bullets.push(bullet_1)

    let bullet_2 = databus.pool.getItemByClass('bullet_2', Bullet)

    bullet_2.init(
      this.x + this.width / 2 - bullet_2.width / 2+20,
      this.y - 10,
      10
    )

    databus.bullets.push(bullet_2)

    let bullet_3 = databus.pool.getItemByClass('bullet_3', Bullet)

    bullet_3.init(
      this.x + this.width / 2 - bullet_3.width / 2-20,
      this.y - 10,
      10
    )

    databus.bullets.push(bullet_3)
  }

}
