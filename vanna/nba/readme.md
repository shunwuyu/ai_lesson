https://www.bilibili.com/video/BV1oH2uYkEMi/?spm_id_from=333.999.0.0&vd_source=3d50341f547faf8df242a214b04f2d86

## 20 个NBA赛季的投篮数据
- 赛季队伍信息、season   2003-04   美国nba 从秋季打到春季
  球队信息、team id team name    
  球员信息、player_id player_name    
  比赛日期、Game Date   
  比赛ID、Game ID   
  事件类型、、区域、   
  投篮命中与否 Event Type Made Shot | Missed Shot ｜ Free Throw 罚球| Rebound 篮板 ｜ Turnover 实物 
  SHOT_MADE TURE/False 成功或失败
  ACTION_TYPE 动作类型 Layup 上篮｜ Dunk 扣篮 ｜ Jump Shot跳投 ｜ Hook Shot 勾手 ｜ Fadeaway 后仰跳投 ｜ Three-Pointer 三分球 ｜ Bank Shot 擦板投篮 | Float Shot 抛投 | Tip-in 补篮
  投篮位置、 posiiton group
  SHOT_TYPE 得分类型  2PT Field Goal ｜ 3PT Field Goal
  ### 位置  position 
  BASIC_ZONE Restricted Area 限制区 通常是一个半圆形的区域，靠近篮筐 ｜ In the Paint (non-RA) 油漆区是指篮筐下方的矩形区域，但不包括限制区。这个区域也被称为“低位” ｜ Midrange 从油漆区外到三分线之间的区域，通常指中距离投篮的位置 ｜ Left Corner 3 （左底角三分）：左侧底线附近的三分线区域，通常是一个较为容易得分的位置 ｜ Right Corner 3（右底角三分） 右侧底线附近的三分线区域，与左底角三分相对  ｜ Above the Break（弧顶三分） 三分线上的弧顶区域，通常是指三分线弧形部分的上方区域 ｜ Backcourt（后场） 半场线到对方篮筐之间的区域，即远离进攻篮筐的一半场地

  ZONE_NAME 用于描述投篮发生的具体球场位置
    left 投篮发生在球场的左侧，靠近左侧边线的区域。
    left side center（左侧中央）：投篮发生在球场的左侧中央区域，介于左侧和中央之间。
    center（中央）：投篮发生在球场的中央区域，位于球场的中间部分。
    right side center（右侧中央）：投篮发生在球场的右侧中央区域，介于右侧和中央之间
    right（右侧）投篮发生在球场的右侧，靠近右侧边线的区域。
  ZONE_ABB 缩写
    (L), (LC), (C), (RC), (R).
  ZONE_RANGE 投篮距离
    Less than 8 ft., 8-16 ft. 16-24 ft. 24+ ft.     
    24+ft 三分 > 7.3152米
  LOC_X， LOC_Y   坐标  0-50  
  SHOT_DISTANCE 表示投篮点到篮筐中心的距离，单位是英尺（feet）。
  QUARTER 哪个时间节点  12分钟一节
  MINS_LEFT   表示从当前时刻到本节结束还剩下多少时间 分钟
  SECS_LEFT  本节当前分钟内剩余的秒数
  ### position
  POSITION_GROUP 球员在场上的位置组别 控球后卫（Point Guard）、得分后卫（Shooting Guard）、小前锋（Small Forward）、大前锋（Power Forward）和中锋（Center）
  POSITION 球员在球场的具体位置 



