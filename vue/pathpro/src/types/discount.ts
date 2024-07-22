export type Discount = {
    /** 国家或地区 */
    region: string
    /** 优惠信息列表 */
    discounts: DiscountItem[]
  }
  
  export type DiscountItem = {
    /** 优惠信息标题 */
    title: string
    /** 封面 */
    cover: string
    /** 评价人数 */
    evaluate: number
    /** 评分 */
    rating: number
    /** 参与人数 */
    participants: string
    /** 城市 */
    city: string
    /** 价格 */
    price: number
    /** 打折信息 */
    discounts: string[]
    /** 标签 */
    tags: string[]
  }