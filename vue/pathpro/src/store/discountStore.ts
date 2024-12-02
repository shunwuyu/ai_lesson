import { defineStore } from "pinia"
import { ref } from "vue"
import type { Discount } from "@/types/discount"

export const useDiscountStore = defineStore("discount", () => {
  const discountInfo = ref<Discount[]>([
    {
      region: "日本",
      discounts: [
        {
          title: "东京三丽鸥彩虹乐园门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_640,c_fill,q_85/activities/z5oxfvdbejb5s78qjwge.webp",
          evaluate: 4273,
          rating: 4.7,
          participants: "200k",
          city: "东京",
          price: 165,
          discounts: ["价格保证", "年终大促"],
          tags: ["热卖", "轻松退款"],
        },
        {
          title: "东京丰洲 teamLab Planets TOKYO 展览门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_2160,h_1440,c_fill,q_85/activities/wtxexj7k3jr5pz0xs9o2.webp",
          evaluate: 6077,
          rating: 4.8,
          participants: "200k",
          city: "东京",
          price: 190,
          discounts: ["年终大促", "B1G1"],
          tags: ["热卖", "立即确认"],
        },
        {
          title: "大阪长居植物园 teamLab Botanical Garden Osaka 门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_2160,h_1440,c_fill,q_85/activities/yvp0rpmm4xgmye4cshb3.webp",
          evaluate: 2779,
          rating: 4.5,
          participants: "100k",
          city: "大阪",
          price: 90,
          discounts: ["年终大促"],
          tags: ["热卖", "立即确认"],
        },
        {
          title: "东京Mega Ilumi 灯光秀2023 - 2024门票（大井赛马场）",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_2160,h_1440,c_fill,q_85/activities/s3cnpljwj3ajnmr9emwy.webp",
          evaluate: 72,
          rating: 4.3,
          participants: "4k",
          city: "东京",
          price: 25,
          discounts: ["年终大促", "价格保证"],
          tags: ["立即确认"],
        },
        {
          title: "福冈teamLab森林美术馆门票 ",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/izgqkr0xlnmka5szdbsy.webp",
          evaluate: 531,
          rating: 4.7,
          participants: "10k",
          city: "福冈",
          price: 110,
          discounts: ["年终大促", "超值优惠"],
          tags: ["热卖", "立即确认"],
        },
        {
          title: "福冈 BOSS E ZO FUKUOKA 门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/l2fkrhfjlgljlc94j2sb.webp",
          evaluate: 71,
          rating: 4.7,
          participants: "5k",
          city: "福冈",
          price: 50,
          discounts: ["年终大促", "价格保证"],
          tags: ["立即确认"],
        },
        {
          title: "冲绳丰见城市 DMM Kariyushi 水族馆门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/wkcjofrgzjylcqlppicj.webp",
          evaluate: 538,
          rating: 4.7,
          participants: "20k",
          city: "冲绳",
          price: 96,
          discounts: ["价格保证"],
          tags: ["热卖", "立即确认"],
        },
        {
          title: "二次元之森火影忍者 & 火影新世代主题乐园门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/ziuyvdvejgmv2jg2wk2q.webp",
          evaluate: 119,
          rating: 4.7,
          participants: "6k",
          city: "兵库县",
          price: 124,
          discounts: ["最高25%折扣"],
          tags: ["热卖", "轻松退款"],
        },
        {
          title: "BOSS E・ZO 福冈美术馆V-World AREA门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/efloofmzc2ovzguxzgfq.webp",
          evaluate: 3,
          rating: 4.7,
          participants: "100",
          city: "福冈",
          price: 200,
          discounts: ["年终大促", "价格保证"],
          tags: ["立即确认"],
        },
        {
          title: "【最高可省JPY5,900】关西乐享周游券",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/k68tcgymiazgbk0poopw.webp",
          evaluate: 223,
          rating: 4.5,
          participants: "30k",
          city: "大阪",
          price: 151,
          discounts: ["年终大促", "B1G1"],
          tags: ["热卖", "轻松退款"],
        },
        {
          title: "大阪空庭温泉门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/bingilyybukyxpkgyahr.webp",
          evaluate: 1811,
          rating: 4.7,
          participants: "80k",
          city: "大阪",
          price: 133,
          discounts: ["年终大促", "价格保证"],
          tags: ["热卖", "轻松退款"],
        },
      ],
    },
    {
      region: "新加坡",
      discounts: [
        {
          title: "新加坡夜间野生动物园门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_640,c_fill,q_85/activities/e9lsycjm1wb884bvek1y.webp",
          evaluate: 7935,
          rating: 4.5,
          participants: "400k",
          city: "新加坡",
          price: 295,
          discounts: ["年终大促", "40% off"],
          tags: ["热卖", "立即确认"],
        },
        {
          title: "新加坡空中缆车往返票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/lxbrecy95s5muqsgtpwb.webp",
          evaluate: 20876,
          rating: 4.7,
          participants: "600k",
          city: "新加坡",
          price: 150,
          discounts: ["年终大促", "35% off"],
          tags: ["热卖", "立即确认"],
        },
        {
          title: "新加坡时光之翼灯光水舞秀门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/e76dpwoxfumhoitwl0cc.webp",
          evaluate: 9810,
          rating: 4.7,
          participants: "300k",
          city: "新加坡",
          price: 92,
          discounts: ["年终大促"],
          tags: ["热卖", "立即确认"],
        },
        {
          title: "新加坡 Wild Wild Wet 水上乐园门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,c_fill,q_85/activities/zlnlnvwhym800ymhosyu.webp",
          evaluate: 3490,
          rating: 4.6,
          participants: "100k",
          city: "新加坡",
          price: 117,
          discounts: ["年终大促", "独家套票"],
          tags: ["热卖", "立即确认"],
        },
        {
          title: "新加坡音乐剧《玛蒂尔达》门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/rbo1asygngqfx8xkjao4.webp",
          evaluate: 10,
          rating: 4.5,
          participants: "400",
          city: "新加坡",
          price: 386,
          discounts: ["年终大促"],
          tags: ["48小时内确认"],
        },
      ],
    },
    {
      region: "港澳",
      discounts: [
        {
          title: "香港海洋公园门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_640,c_fill,q_85/activities/wbmzwynrr6vcvwfrjjgk.webp",
          evaluate: 67248,
          rating: 4.7,
          participants: "1M",
          city: "中国香港",
          price: 180,
          discounts: ["香港夜飨乐"],
          tags: ["热卖", "立即确认"],
        },
        {
          title: "香港迪士尼乐园门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/uifimxcuodqe2oclxqin.webp",
          evaluate: 151083,
          rating: 4.8,
          participants: "4M",
          city: "中国香港",
          price: 535,
          discounts: ["香港夜飨乐", "年终大促"],
          tags: ["热卖", "立即确认"],
        },
        {
          title: "[PathPro专属VIP换票通道] 昂坪360缆车门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/gtab1rrhq0yuho5xmn5q.webp",
          evaluate: 45248,
          rating: 4.7,
          participants: "1M",
          city: "中国香港",
          price: 177,
          discounts: ["香港夜飨乐", "年终大促"],
          tags: ["热卖", "立即确认"],
        },
        {
          title: "香港太平山顶 -第六代山顶缆车套票或凌霄阁摩天台428门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/tq125ajrqzbbtymakqhb.webp",
          evaluate: 17366,
          rating: 4.5,
          participants: "700k",
          city: "中国香港",
          price: 71,
          discounts: ["香港夜飨乐"],
          tags: ["热卖", "立即确认"],
        },
        {
          title: "香港杜莎夫人蜡像馆门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/fyxznjxs1bqcajxoerzh.webp",
          evaluate: 3836,
          rating: 4.7,
          participants: "100k",
          city: "中国香港",
          price: 205,
          discounts: ["香港夜飨乐"],
          tags: ["热卖", "立即确认"],
        },
      ],
    },
    {
      region: "南韩",
      discounts: [
        {
          title: "韩国乐高乐园®门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_640,c_fill,q_85/activities/rt7x7i42m3aal56zi75h.webp",
          evaluate: 230,
          rating: 4.4,
          participants: "9k",
          city: "江原道",
          price: 131,
          discounts: ["年终大促"],
          tags: ["轻松退款", "立即确认"],
        },
        {
          title: "首尔乐天世界门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/tjsukcbjgefqm5lc1iah.webp",
          evaluate: 22856,
          rating: 4.6,
          participants: "600k",
          city: "首尔",
          price: 191,
          discounts: ["年终大促"],
          tags: ["热卖", "立即确认"],
        },
      ],
    },
    {
      region: "欧洲",
      discounts: [
        {
          title: "巴黎迪士尼乐园门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_640,c_fill,q_85/activities/pou1mskyxljgapoolawp.webp",
          evaluate: 6298,
          rating: 4.8,
          participants: "200k",
          city: "巴黎",
          price: 438,
          discounts: ["年终大促"],
          tags: ["热卖", "轻松退款"],
        },
        {
          title: "阿姆斯特丹海尼根体验馆门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/a1fqckwgk14snjp7hydo.webp",
          evaluate: 1029,
          rating: 4.7,
          participants: "10k",
          city: "阿姆斯特丹",
          price: 180,
          discounts: ["买2立享50%折扣"],
          tags: ["热卖", "立即确认"],
        },
      ],
    },
    {
      region: "美国",
      discounts: [
        {
          title: "加州好莱坞环球影城门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_640,c_fill,q_85/activities/vrvkyaub0wi1jvluafqb.webp",
          evaluate: 4404,
          rating: 4.9,
          participants: "100k",
          city: "洛杉矶",
          price: 772,
          discounts: ["年终大促"],
          tags: ["热卖", "立即确认"],
        },
        {
          title: "圣地亚哥海洋世界门票",
          cover:
            "https://res.klook.com/image/upload/fl_lossy.progressive,w_640,h_426,c_fill,q_85/activities/ibhzbxsi4smvtzdnjnri.webp",
          evaluate: 669,
          rating: 4.7,
          participants: "20k",
          city: "圣迭戈",
          price: 347,
          discounts: ["年终大促", "以减6%"],
          tags: ["热卖", "立即确认"],
        },
      ],
    },
  ])

  return {
    discountInfo,
  }
})