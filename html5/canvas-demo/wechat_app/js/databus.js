import Pool from './base/pool'
import Hp_re from './item/hp_re'
import Shoot_mode3 from './item/shoot_mode3'
let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  
  constructor() {
    if ( instance )
      return instance

    instance = this
    this.hp_re = new Hp_re(20,0,2)
    this.shoot_mode3=new Shoot_mode3(20,0,2)
    this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.frame      = 0
    this.score      = 0
    this.bullets    = []
    this.enemy_bullets=[]
    this.enemys     = []
    this.animations = []
    this.gameOver   = false
   
  }

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(enemy) {
    let temp = this.enemys.shift()

    temp.visible = false

    this.pool.recover('enemy', enemy)
  }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet) {
    let temp = this.bullets.shift()
    temp.visible = false
    this.pool.recover('bullet', bullet)
  }
  removeEnemyBullets(bullet) {
    let temp = this.enemy_bullets.shift()
    temp.visible = false
    this.pool.recover('enemy_bullets', bullet)
  }
  
}
