# 用于网页设计的 Claude Code

做一个食品外卖移动应用的落地页

用户第一次看到这个产品时，这个页面应该怎么讲故事、怎么建立信任、怎么促使下载。

第一轮 prompt，我故意写得很简单

code a landing page for a food delivery mobile app called Foodiez
为一款名为 Foodiez 的外卖送餐手机应用编写一个落地页代码


原型最大的价值，不是“完美”，而是“马上能改”

第一，整页的颜色更适合改成更鲜艳的橙色，因为食品外卖这个品类本身就更适合这种更有食欲感、更有冲击力的色系；

第二，“Every Craving Covered” 这一块，用网格排法有点太普通了，我更希望它改成横向可滚动的卡片轮播。

- change web page color theme to vibrant orange and change the items in the 
Every Craving Covered section to horizontal scrollable carousel with cards

将网页主题色调改为鲜亮橙色，再把 “尽享各式美味” 板块里的内容改成可横向滑动的卡片轮播样式


上一轮里，Claude 产出的是纯 HTML/CSS/JS 页面，这对快速原型来说完全没问题。但如果你真想把它变成一个接近生产环境的结果，你大概率不会满足于“能跑”就算了，而会希望它直接按你的技术栈来搭，比如 React + TypeScript + Tailwind CSS 这种你团队真实会用的方案。

所以这一轮 prompt，我会写得更完整，覆盖以下信息：

1. 任务描述
2. 最终目标
3. 技术栈
4. 风格和视觉方向
5. 页面结构
6. 无障碍要求
7. 交付内容

也就是说，我不是只告诉它“做一个页面”，而是要明确告诉它：做成什么、用什么做、长什么样、包含什么模块、到什么质量标准才算完成。

```
Build a modern, responsive landing page for a food delivery mobile
app called “Foodiez”.

GOAL
Create a high-conversion marketing landing page that promotes the app, communicates value instantly, and drives users to download the app.

TECH STACK
Use:
- React + TypeScript
- Tailwind CSS
- Framer Motion for animations
- Component-based architecture
- Mobile-first responsive layout
- Accessible semantic HTML

The result must be production-ready.

STYLE & VISUAL DIRECTION
- Clean, modern, premium UI
- Bright and appetizing food delivery aesthetic
- Primary color: Orange (#FF6B35)
- Neutrals: white, light gray backgrounds
- Soft shadows, large border radius (2xl)
- Smooth micro-interactions
- Use high-quality food imagery placeholders
- Typography: bold, friendly, highly readable
- Spacious layout with clear visual hierarchy

PAGE STRUCTURE

1) NAVBAR
- Logo: Foodiez
- Links: How it works, Restaurants, Reviews, Download
- Sticky on scroll
- CTA button: “Get the App”

2) HERO SECTION
Left:
- Headline: “Your favorite food, delivered fast”
- Subtext explaining the core value
- App Store + Google Play buttons
- Trust indicators (rating, delivery time, number of restaurants)

Right:
- iPhone mockup showing the app UI
- Floating animated food cards or delivery status elements

3) SOCIAL PROOF
- Row of partner restaurant logos
- Short testimonial cards with avatar, name, and quote
- Star ratings

4) HOW IT WORKS (3 STEPS)
Each step includes:
- Icon or illustration
- Title
- Short description

Steps:
Browse restaurants → Order in seconds → Fast delivery

5) FEATURE HIGHLIGHTS
Alternating two-column layout with image + text:

Features:
- Real-time order tracking
- Personalized recommendations
- Lightning-fast checkout
- Exclusive local restaurants

Include subtle scroll-triggered animations.

6) APP PREVIEW SECTION
- Horizontal scrollable phone mockups
- Each screen highlights a key app capability

7) PROMO BANNER
- “Free delivery on your first order”
- Strong visual emphasis
- CTA button

8) FINAL CTA SECTION
- Large bold text
- “Download Foodiez and get your food faster than ever”
- App store buttons
- Gradient or colored background

9) FOOTER
- Logo
- Navigation links
- Social icons
- App download buttons
- Copyright

ANIMATIONS & INTERACTIONS
- Smooth scroll behavior
- Fade/slide-in on viewport
- Hover states for buttons and cards
- Parallax or floating elements in hero
- Button press micro-interactions

RESPONSIVENESS
- Fully optimized for mobile, tablet, and desktop
- Stack sections vertically on small screens
- Maintain strong spacing and readability

ACCESSIBILITY
- Proper heading hierarchy
- Alt text for images
- Visible focus states
- WCAG-compliant color contrast

DELIVERABLE
Return:
- Clean structured React components
- Reusable UI sections
- Tailwind styling
- Framer Motion animation implementation
- No placeholder lorem ipsum — use realistic marketing 
copy for a food delivery product
```