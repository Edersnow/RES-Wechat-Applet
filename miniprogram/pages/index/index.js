var app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    main_arr: [{
      name: '龙岩市古田旅游区',
      target: '../../head_img/Gutian.jpg',
      location: '龙岩市|上杭县',
      index: '../Gutian_page/Gutian_page',
      level: '5A级景区'
    },{
      name: '毛泽东才溪乡调查旧址',
      target: '../../head_img/Caixi.jpg',
      location: '龙岩市|上杭县',
      index: '../Caixi_page/Caixi_page',
      level: '4A级景区'
    },{
      name: '中央苏区（闽西）历史博物馆',
      target: '../../head_img/Minxi.jpg',
      location: '龙岩市|新罗区',
      index: '../Minxi_page/Minxi_page',
      level: '3A级景区'
    },{
      name: '东肖红色旧址群',
      target: '../../head_img/Dongxiao.jpg',
      location: '龙岩市|新罗区',
      index: '../Dongxiao/Dongxiao',
      level: '3A级景区'
    },{
      name: '长汀红色旧址群',
      target: '../../head_img/Changting.jpg',
      location: '龙岩市|长汀县',
      index: '../Changting_page/Changting_page',
      level: '4A级景区'
    },{
      name: '松毛岭战地遗址',
      target: '../../head_img/Songmaoling.jpg',
      location: '龙岩市|连城县',
      index: '../Songmaoling_page/Songmaoling_page',
      level: '3A级景区'
    }],
  },

  open_page: function(event){
    var urls = event.currentTarget.dataset.url;
    if (app.globalData.Gotsign){
      wx.navigateTo({
        url: urls
      })
    }
    else{
      wx.cloud.callFunction({
        name: 'getOpenid',
        //获取openid
        success: res => {
          app.globalData.openId = res.result.openid;
          app.globalData.sign_in._id = res.result.openid;

          //从数据库获取签到数据
          db.collection('SignRecorder').where({
            '_openid' : res.result.openid
          }).get({
            success(re){

              //添加新的签到记录
              if (re.data.length == 0) {
                db.collection('SignRecorder').add({
                  data : app.globalData.sign_in,
                  success(r){
                    app.globalData.Gotsign = true
                    wx.navigateTo({
                      url: urls
                    })
                  },
                  fail(r){
                    wx.showToast({
                      title: '获取签到数据失败，请检查您的网络连接后重试',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                })
              }

              //签到数据存在
              else{
                app.globalData.sign_in = re.data[0],
                app.globalData.Gotsign = true,
                wx.navigateTo({
                  url: urls
                })
              }
            },
            fail: function(res){
              wx.showToast({
                title: '获取签到数据失败，请检查您的网络连接后重试',
                icon: 'none',
                duration: 2000
              })
            }
          })
        },
        fail: function(res){
          wx.showToast({
            title: '获取签到数据失败，请检查您的网络连接后重试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.Gotsign){
      wx.showLoading({
        title: '获取签到数据中...',
        mask: true
      })

      //获取openid
      wx.cloud.callFunction({
        name: 'getOpenid',
        success: res => {
          app.globalData.openId = res.result.openid;
          app.globalData.sign_in._id = res.result.openid;

          //获取签到数据
          db.collection('SignRecorder').where({
            '_openid' : res.result.openid
          }).get({
            success(re){

              //不存在，新建
              if (re.data.length == 0) {
                db.collection('SignRecorder').add({
                  data : app.globalData.sign_in,
                  success(r){
                    app.globalData.Gotsign = true
                    wx.hideLoading();
                  },
                  fail(r){
                    wx.hideLoading({
                      success: (res) => {
                        setTimeout(() => {
                          wx.showToast({
                            title: '获取签到数据失败，请检查您的网络连接',
                            icon: 'none',
                            duration: 2000
                          })
                        }, 500);
                      },
                    })
                  }
                })
              }

              //存在
              else{
                app.globalData.sign_in = re.data[0],
                app.globalData.Gotsign = true,
                wx.hideLoading();
              }
            },
            fail(r){
              wx.hideLoading({
                success: (res) => {
                  setTimeout(() => {
                    wx.showToast({
                      title: '获取签到数据失败，请检查您的网络连接',
                      icon: 'none',
                      duration: 2000
                    })
                  }, 500);
                },
              })
            }
          })
        },
        fail: function(res){
          wx.hideLoading({
            success: (res) => {
              setTimeout(() => {
                wx.showToast({
                  title: '获取签到数据失败，请检查您的网络连接',
                  icon: 'none',
                  duration: 2000
                })
              }, 500);
            },
          })
        }
      })
    }
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