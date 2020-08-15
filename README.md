# **红土行歌 · 微信小程序**

## **一、概述**

### **①小程序结构**

```
    主页面
    |
    |--景点1（导航模块）
    |  |--简介页面
    |  |--详细信息页面
    |  \--评论区块
    |
    ...

```

### **②具体页面结构**

+ **主页面**：logo(?)+列表
+ **景点界面**：与三个子页面结合，作为导航模块（参考bilibili），顶部为景点图片。
+ **简介页面**：给出景点大致的介绍，以及打卡按钮
+ **详细信息页面**：
  + 地址
  + 联系电话
  + 当地天气情况
  + ~~地图导航（tx内置模块）~~ 地图定位
  + 建议交通方式
  + 建议食宿
  + （待完善）

### **③数据交互**

+ 打卡信息
+ 评论信息

### **④补充部分**

+ 加入星级评分（8/14）
+ 推荐一日游/二日游等等路线的页面(8/14)
+ 在地图上展示所有景点所在地(8/15)

## **二、日志**

+ **8/15**：完善网页布局 + 学习map
  + 完成详细信息页面的布局、评论区页面的布局（还是暂未加入图片233）
  + 了解了关于小程序内置的map能做什么。**打算先完成 展示所有景点所在地 显示景点在地图上的位置 一日游/二日游路线 这几个部分**，比较麻烦的导航看之后如果有空再做
  + 打算开始做数据交互……

+ **8/14**：学习ing + 尝试做一些页面的框架
  + 完成简介页面的布局
  + 完成详细信息页面的部分信息（准备了icons）（尚未加入图片元素）
  + 了解关于用户信息的获取与数据库的一些细节
  + **打算把详细信息页面中的地址、联系电话、天气、导航部分放在一个列表，建议交通方式与建议食宿单独放后（考虑到内含信息可能比前几项大很多，而且属于建议部分，不太适合放在一起）**
  + 规划之后较主要的任务：完成页面布局的设置，学习map模块，完成信息交互


+ **8/13**：做一些基础准备，进行一些具体实现方法的学习
  + 完成一些基础的文件准备
  + 完成主页面布局（大致）（未加入图片元素）（未优化）
  + **打算先将景点的三个分页面先整合在一个页面内（有空再拆）（功能优先）**
  + 学习云开发ing
  + 学习一些实例ing
