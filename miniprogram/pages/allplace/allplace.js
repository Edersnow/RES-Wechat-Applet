// pages/allplace/allplace.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      id: 0,
      latitude: 25.217112,
      longitude: 116.826231,
      width: 25,
      height: 25,
      callout: {
        content: '龙岩市古田旅游区',
        color: "#888888",
        fontSize: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#D2D2D2",
        bgColor: "#F1F1F1",
        padding: 5,
        textAlign: "center" ,
        display: 'ALWAYS'
      }
    },{
      id: 1,
      latitude: 25.250952,
      longitude: 116.418711,
      width: 25,
      height: 25,
      callout: {
        content: '毛泽东才溪乡调查旧址',
        color: "#888888",
        fontSize: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#D2D2D2",
        bgColor: "#F1F1F1",
        padding: 5,
        textAlign: "center" ,
        display: 'ALWAYS'
      }
    },{
      id: 2,
      latitude: 25.102366,
      longitude: 117.024105,
      width: 25,
      height: 25,
      callout: {
        content: '中央苏区（闽西）历史博物馆',
        color: "#888888",
        fontSize: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#D2D2D2",
        bgColor: "#F1F1F1",
        padding: 5,
        textAlign: "center" ,
        display: 'ALWAYS'
      }
    },{
      id: 3,
      latitude: 25.836342,
      longitude: 116.355866,
      width: 25,
      height: 25,
      callout: {
        content: '长汀红色旧址群',
        color: "#888888",
        fontSize: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#D2D2D2",
        bgColor: "#F1F1F1",
        padding: 5,
        textAlign: "center" ,
        display: 'ALWAYS'
      }
    },{
      id: 4,
      latitude: 25.571127,
      longitude: 116.597222,
      width: 25,
      height: 25,
      callout: {
        content: '松毛岭战地遗址',
        color: "#888888",
        fontSize: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#D2D2D2",
        bgColor: "#F1F1F1",
        padding: 5,
        textAlign: "center" ,
        display: 'ALWAYS'
      }
    },{
      id: 5,
      latitude: 24.997541,
      longitude: 117.007150,
      width: 25,
      height: 25,
      callout: {
        content: '东肖红色旧址群',
        color: "#888888",
        fontSize: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#D2D2D2",
        bgColor: "#F1F1F1",
        padding: 5,
        textAlign: "center" ,
        display: 'ALWAYS'
      }
    }]
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