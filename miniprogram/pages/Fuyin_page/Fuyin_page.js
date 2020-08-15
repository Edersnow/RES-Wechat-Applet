// pages/Fuyin_page/Fuyin_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_urls:[
      "",
      ""
    ],

    BI_contents: "    ",

    DI_contents: [{
      title : "地址",
      icon_url : "../../icons/address.svg",
      contents : ""
    },{
      title : "联系电话",
      icon_url : "../../icons/telephone.svg",
      contents : ""
    },{
      title : "天气",
      icon_url : "../../icons/weather.svg",
      contents : ""
    }],

    DI_nexts: [{
      title : "地图导航",
      icon_url : "../../icons/routine.svg",
      next_url : "../../icons/next.svg"
    }],

    RC_contents: [{
      title : "推荐出行方式",
      icon_url : "../../icons/tour.svg",
      content : "    "
    },{
      title : "推荐食宿",
      icon_url : "../../icons/food.svg",
      content : "    "
    },{
      title : "注意事项",
      icon_url : "../../icons/attention.svg",
      content : "    "
    }],

    MB_contents : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})