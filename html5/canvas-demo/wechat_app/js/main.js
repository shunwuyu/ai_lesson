import Player     from './player/index'
import Enemy      from './npc/enemy'
import BackGround from './runtime/background'
import GameInfo   from './runtime/gameinfo'
import Music      from './runtime/music'
import DataBus    from './databus'

let ctx   = canvas.getContext('2d')
let databus = new DataBus()


/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId    = 0

    this.restart()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg       = new BackGround(ctx)
    this.player   = new Player(ctx)
    this.gameinfo = new GameInfo()
    this.music    = new Music()

    this.bindLoop     = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    if ( databus.frame % 30 === 0 ) {
      let enemy = databus.pool.getItemByClass('enemy', Enemy)
      enemy.init(3)
      databus.enemys.push(enemy)
    }
  }

  

  // 全局碰撞检测
  collisionDetection() {
    let that = this

    databus.bullets.forEach((bullet) => {
      for ( let i = 0, il = databus.enemys.length; i < il;i++ ) {
        let enemy = databus.enemys[i]
        //如果敌机碰撞到了子弹
        if ( !enemy.isPlaying && enemy.isCollideWith(bullet) ) {
          enemy.playAnimation()
          that.music.playExplosion()
          //生成补给
          console.log("y="+databus.shoot_mode3.y)
          if(databus.hp_re.y>1000)
            databus.hp_re.init(enemy.x,enemy.y,2)
          else if(databus.shoot_mode3.y>3000)
            databus.shoot_mode3.init(enemy.x,enemy.y,2)
          if(databus.shoot_mode3.y>2000){
            this.player.shoot_mode=0
          }
          
          bullet.visible = false
          databus.score  += 1
          break
        }
      } 
    })
    //如果玩家撞到了敌机
    for ( let i = 0, il = databus.enemys.length; i < il;i++ ) {
      let enemy = databus.enemys[i]
      if ( this.player.isCollideWith(enemy) ) {
        this.player.hp-=2
        if( this.player.hp<=0)
          databus.gameOver = true
        enemy.playAnimation()
        that.music.playExplosion()
        break
      }
    }
    //如果玩家撞到子弹
    databus.enemy_bullets.forEach((item) => {
      if(this.player.isCollideWith(item)){
        console.log(this.player.hp)
        this.player.hp--
        if(this.player.hp<=0)
          databus.gameOver = true
        that.music.playExplosion()
        item.visible=false;
        //this.player.playAnimation()
      }
    })
    //如果玩家撞到补给
    
      if(this.player.isCollideWith(databus.hp_re)){
        this.player.hp++
        databus.hp_re.visible=false;
        //this.player.playAnimation()
      }
      if(this.player.isCollideWith(databus.shoot_mode3)){
        this.player.shoot_mode=3
        databus.shoot_mode3.visible=false;
        //this.player.playAnimation()
      }
    

  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
     e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (   x >= area.startX
        && x <= area.endX
        && y >= area.startY
        && y <= area.endY  )
      this.restart()
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  //渲染
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)

    databus.bullets
          .concat(databus.enemys).concat(databus.hp_re).concat(databus.shoot_mode3)
          .forEach((item) => {
              item.drawToCanvas(ctx)
            })

    databus.enemy_bullets.forEach((item) => {
      item.drawToCanvas(ctx)
    })
    
    
    
    this.player.drawToCanvas(ctx)

    databus.animations.forEach((ani) => {
      if ( ani.isPlaying ) {
        ani.aniRender(ctx)
      }
    })

    this.gameinfo.renderGameScore(ctx, databus.score,this.player.hp)

    // 游戏结束停止帧循环
    if ( databus.gameOver ) {
      this.gameinfo.renderGameOver(ctx, databus.score)

      if ( !this.hasEventBind ) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if ( databus.gameOver )
      return;

    this.bg.update()

    databus.bullets
           .concat(databus.enemys).concat(databus.hp_re).concat(databus.shoot_mode3)
           .forEach((item) => {
              item.update()
            })
    databus.enemy_bullets.forEach((item) => {
      item.update()
      })

    this.enemyGenerate()
    this.collisionDetection()
  //此处可以调整子弹倍率
    if(this.player.shoot_mode==3&& databus.frame % 10 === 0 ){
      this.player.shoot()
      this.music.playShoot()
    }
    else if ( databus.frame % 20 === 0 ) {
      this.player.shoot()
      this.music.playShoot()
    }
    //敌人子弹刷新
    if ( databus.frame % 100 === 0 ) {
      for ( let i = 0, il = databus.enemys.length; i < il;i++ ){
        let enemy = databus.enemys[i]
        if(enemy.visible)
          enemy.enemy_shoot()
      }
    }

  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
