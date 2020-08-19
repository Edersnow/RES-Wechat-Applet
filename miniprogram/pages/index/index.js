var app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    main_arr: [{
      name: '古田会议旧址',
      target: '../../head_img/Gutian.jpg',
      location: '龙岩市|上杭县',
      index: '../Gutian_page/Gutian_page'
    },{
      name: '才溪乡调查纪念馆',
      target: '../../head_img/Caixi.jpg',
      location: '龙岩市|上杭县',
      index: '../Caixi_page/Caixi_page'
    },{
      name: '福音医院',
      target: '../../head_img/Fuyin.jpg',
      location: '龙岩市|长汀县',
      index: '../Fuyin_page/Fuyin_page'
    },{
      name: '闽西工农银行',
      target: '',
      location: '龙岩市|长汀县',
      index: '../Yinhang_page/Yinhang_page'
    },{
      name: '后田暴动纪念馆',
      target: '../../head_img/Houtian.jpg',
      location: '龙岩市|新罗区',
      index: '../Houtian_page/Houtian_page'
    },{
      name: '邓子恢纪念馆',
      target: '../../head_img/Dengzihui.jpg',
      location: '龙岩市|新罗区',
      index: '../Dengzihui_page/Dengzihui_page'
    },{
      name: '闽西历史博物馆',
      target: '../../head_img/Minxi.jpg',
      location: '龙岩市|新罗区',
      index: '../Minxi_page/Minxi_page'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '获取签到数据中...',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        app.globalData.openId = res.result.openid;
        app.globalData.sign_in._id = res.result.openid;
        db.collection('SignRecorder').where({
          '_openid' : res.result.openid
        }).get({
          success(re){
            if (re.data.length == 0) {
              db.collection('SignRecorder').add({
                data : app.globalData.sign_in
              })
            }
            else{
              app.globalData.sign_in = re.data[0]
            }
            setTimeout(() => {  
              wx.hideLoading();  
            }, 100);
          }
        })
      }
    })
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