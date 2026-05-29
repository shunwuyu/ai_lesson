[source](https://time.geekbang.org/column/article/871242)

## 星盘数据
如果没有数据，光给大模型出生日期和地点，它多半会瞎说一通。
其实这很正常，AI 现在比较像人，你想想，如果老板让你做什么事，但是不给你具体的资源，你可能也会胡乱搞点东西交差。

- https://www.xingpan.vip/
- 新建插件
natal
![](https://static001.geekbang.org/resource/image/01/c1/01yy60804d3aab91053972e306152ec1.png?wh=835x666)

代码：
```js
import { Args } from '@/runtime';
import { Input, Output } from "@/typings/natal/natal";

/**
  * Each file needs to export a function named `handler`. This function is the entrance to the Tool.
  * @param {Object} args.input - input parameters, you can get test input value by input.xxx.
  * @param {Object} args.logger - logger instance used to print logs, injected by runtime
  * @returns {*} The return data of the function, which should match the declared output parameters.
  * 
  * Remember to fill in input/output in Metadata, it helps LLM to recognize and use tool.
  */
const styleText = `@font-face{font-family:'web_ixingpan';src:url('../fonts/ixingpan.eot');src:url('../fonts/ixingpan.woff') format('woff'), url('../fonts/ixingpan.ttf') format('truetype'), url('../fonts/ixingpan.svg') format('svg');font-weight:normal;font-style:normal;}@font-face{font-family:'web_ixingpan_cn';src:url('../fonts/ixingpancn.eot');src:url('../fonts/ixingpancn.woff') format('woff'), url('../fonts/ixingpancn.ttf') format('truetype'), url('../fonts/ixingpancn.svg') format('svg');font-weight:normal;font-style:normal;}@media screen and (min-width:680px){.box-svg{width:600px;height:600px;margin:0 auto;}}@media screen and (max-width:680px){.box-svg{width:100%;height:100%;margin:0 auto;}}text{text-anchor:middle;dominant-baseline:middle;cursor:pointer;}.text_font{font-family:'web_ixingpan_cn';}.must_symbo_font{font-family:'web_ixingpan';}.red{color:red;}#chartbody #zodiac{fill:#f8f8c1;stroke:#b58c00;stroke-width:2;}#chartbody #zodiac_min{fill:#EFF;stroke:#b58c00;stroke-width:2;}#chartbody #hcircle{fill:white;stroke:#2279ab;stroke-width:1;}#chartbody #hcircle_min{fill:white;stroke:#2279ab;stroke-width:1;}#chartbody .origin{stroke:#505050;stroke-width:0.8;}#chartbody .zodiac_grid{stroke:#b58d00;stroke-width:2;}#chartbody .origin:hover{fill:#CCF;}#chartbody .house_grid{stroke:#6699CC;fill:none;stroke-width:0.5;stroke-dasharray:2, 1;}#chartbody .house_dark_grid{stroke:#2279ab;stroke-width:1;}#chartbody .house_dark_grid_attribute{stroke:#2279ab;stroke-width:2;}#chartbody .house_id{font-size:16px;stroke-width:1;}#chartbody .house_id:hover{line-height:1;font-size:20px;}.longitude__font{font-size:10px;stroke:none;fill:#000;}.house_1,.house_5,.house_9{fill:red;color:red;}.house_2,.house_6,.house_10{fill:#CC9933;color:#CC9933;}.house_3,.house_7,.house_11{fill:#006633;color:#006633;}.house_4,.house_8,.house_12{fill:#0A0AFF;color:#0A0AFF;}.sign_font{font-size:26px;}.sign_font:hover{font-size:28px;}.sign_Aries,.sign_Leo,.sign_Sagittarius{stroke:none;fill:red;color:red;}.sign_Taurus,.sign_Virgo,.sign_Capricorn{stroke:none;fill:#CC9933;color:#CC9933;}.sign_Gemini,.sign_Libra,.sign_Aquarius{stroke:none;fill:#006633;color:#006633;}.sign_Cancer,.sign_Scorpio,.sign_Pisces{stroke:none;fill:#0A0AFF;color:#0A0AFF;}.senior_sign_font{font-size:20px!important;}.senior_sign_font:hover{font-size:22px!important;}.guardian_font{font-size:16px;}.guardian_font:hover{font-size:20px;}.planet_font{font-size:14px;line-height:1;stroke:none;}.planet_font:hover{font-size:16px;}.planet_font2{font-size:14px;line-height:1;stroke:none;}.planet_font2:hover{font-size:16px;}.planets_Sun,.planets_Ascendant,.planets_Jupiter,.planets_Mars{fill:red;color:red;stroke:none;}.planets_Moon,.planets_IC,.planets_Neptune,.planets_Pluto{fill:#0A0AFF;color:#0A0AFF;stroke:none;}.planets_Saturn,.planets_Venus,.planets_MC{fill:#CC9933;color:#CC9933;stroke:none;}.planets_Mercury,.planets_Des,.planets_Uranus{stroke:none;fill:#006633;color:#006633;}.planets_Chiron,.planets_Pholus,.planets_Ceres,.planets_Pallas,.planets_Juno,.planets_Vesta,.planets_Psyche,.planets_Eros{fill:#FF33FF;color:#FF33FF;stroke:none;}.planets_Cupido,.planets_Hades,.planets_Zeus,.planets_Kronos,.planets_Apollon,.planets_Admetos,.planets_Vulcanus,.planets_Poseidon{fill:#AC00AC;color:#AC00AC;stroke:none;}.planets_oscApogee,.planets_meanApogee,.planets_trueNode,.planets_meanNode,.planets_TrueSouthNode,.planets_MeanSouthNode,.planets_equatAsc,.planets_Sun-Moon,.planets_PartOfFortune,.planets_Vertex{fill:#00B8B8;color:#00B8B8;stroke:none;}.planet_sign_line_0{stroke:#7f7f00;fill:#7f7f00;}.planet_sign_line_60{stroke:#00B8B8;fill:#00B8B8;}.planet_sign_line_90{stroke:red;fill:red;}.planet_sign_line_120{stroke:#006633;fill:#006633;}.planet_sign_line_180{stroke:blue;fill:blue;}.planet_sign_line_30,.planet_sign_line_150{stroke:#ff00ff;fill:#ff00ff;}.planet_sign_line_36,.planet_sign_line_72,.planet_sign_line_144{stroke:#404040;fill:#404040;}.planet_sign_line_45,.planet_sign_line_135{stroke:#7f7f00;fill:#7f7f00;}.planets_circle:hover{r:2;}.planet_sign_line:hover{stroke-width:2!important;stroke-dasharray:none!important;}#tip_sign_add{position:absolute;z-index:9999;padding:10px;border:1px solid #F1D031;background-color:#FFFFA3;color:#555;font-size:14px;line-height:1.5;display:none;}.switch_web_ixingpan{color:#0A0AFF;}.senior_planet_deg{font-family:"Microsoft YaHei",寰蒋闆呴粦,"MicrosoftJhengHei",鍗庢枃缁嗛粦,STHeiti,MingLiu;fill:black;font-size:16px;}.senior_planet_min{font-family:"Microsoft YaHei",寰蒋闆呴粦,"MicrosoftJhengHei",鍗庢枃缁嗛粦,STHeiti,MingLiu;fill:#999999;font-size:12px;}.senior_planet_font{font-size:24px;line-height:1;stroke:none;}.senior_planet_font:hover{font-size:28px;}.senior_house_sign_r{stroke:none;fill:#f73030;font-size:24px;}`
export async function handler({ input, logger }: Args<Input>): Promise<Output> {
  // token
  const ACCESS_TOKEN = '989f888c4283e2cc2d8a5aa4af60932c';
  // 接口api 地址
  const api = 'https://www.xingpan.vip/astrology/chart/natal';
  // 星体 
  const planets = [ 0,1,2,3,4,5,6,7,8,9, //日月水金火木土天海冥 
  'D', //凯龙 
  'm', //北交 
  ];

  const virtual = [
    10,// 上升
    11,// 中天
    21,// 南交
  ]

  const h_sys = 'P';
  const phase = [];
  phase[0] = 8; 
  phase[30] = 2; 
  phase[36] = 2; 
  phase[45] = 2; 
  phase[60] = 5; 
  phase[72] = 2; 
  phase[90] = 8; 
  phase[120] = 6; 
  phase[135] = 0.5; 
  phase[142] = 2; 
  phase[150] = 2; 
  phase[180] = 8;

  const payload = {
    ...input,
    access_token: ACCESS_TOKEN,
    planets,
    virtual,
    h_sys,
    svg_type: 0
  };

  const res = await fetch(api, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const { data } = await res.json();
  const svg = data.svg.replace(/()/, `$1`);
  data.svg = svg;

  return {
    output: data,
  };
};
```

- 测试参数
{
    "birthday" : "2023-08-23 08:00:00",
    "longitude" : 119.3,
    "latitude" : 26.08,
    "tz" : 8
}