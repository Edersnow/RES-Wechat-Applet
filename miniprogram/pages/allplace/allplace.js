// pages/allplace/allplace.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "../../icons/locate.svg",
      id: 0,
      latitude: 25.216220,
      longitude: 116.827240,
      width: 25,
      height: 25,
      callout: {
        content: '古田会议会址',
        color: "#888888",
        fontSize: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#D2D2D2",
        bgColor: "#F1F1F1",
        padding: 4,
        textAlign: "center" ,
        display: 'BYCLICK'
      }
    },{
      iconPath: "../../icons/locate.svg",
      id: 1,
      latitude: 25.250952,
      longitude: 116.418711,
      width: 25,
      height: 25,
      callout: {
        content: '才溪乡调查纪念馆',
        color: "#888888",
        fontSize: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#D2D2D2",
        bgColor: "#F1F1F1",
        padding: 4,
        textAlign: "center" ,
        display: 'BYCLICK'
      }
    },{
      iconPath: "../../icons/locate.svg",
      id: 2,
      latitude: 25.019351,
      longitude: 117.016020,
      width: 25,
      height: 25,
      callout: {
        content: '邓子恢纪念馆',
        color: "#888888",
        fontSize: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#D2D2D2",
        bgColor: "#F1F1F1",
        padding: 4,
        textAlign: "center" ,
        display: 'BYCLICK'
      }
    },{
      iconPath: "../../icons/locate.svg",
      id: 2,
      latitude: 24.997644,
      longitude: 117.007913,
      width: 25,
      height: 25,
      callout: {
        content: '后田暴动旧址',
        color: "#888888",
        fontSize: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#D2D2D2",
        bgColor: "#F1F1F1",
        padding: 4,
        textAlign: "center" ,
        display: 'BYCLICK'
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