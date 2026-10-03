import { Laya } from "laya-system-one";

// 主函数
async function run() {
  // 加载引擎，首次运行会自动下载模型（~324MB）
  const laya = await Laya.load();

  // state：输入上下文
  const state = {
    msg: "账号登录失败，提示权限不足"
  };

  // questions：定义要做的判断（choice/score/noul）
  const questions = {
    // 单选分类
    category: {
      type: "choice",
      instructions: "这条消息属于哪一类问题",
      criteria: {
        auth: "权限、登录、账号认证",
        bug: "功能报错、程序异常",
        billing: "扣费、账单问题"
      }
    },
    // 布尔判断 noul：true/false
    isUrgent: {
      type: "noul",
      instructions: "这个问题是否阻断用户使用系统",
      threshold: 0.5
    }
  };

  // 推理
  const result = await laya.predict(state, questions);

  console.log("=== 推理结果 ===");
  console.log("分类：", result.answers.category.choice);
  console.log("分类概率：", result.answers.category.probabilities);
  console.log("是否紧急：", result.answers.isUrgent.value);
  console.log("紧急概率：", result.answers.isUrgent.probability);
}

run().catch(console.error);
