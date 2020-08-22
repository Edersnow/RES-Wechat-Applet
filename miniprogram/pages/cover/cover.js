// pages/cover/cover.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  placelist:function(){
    if (app.globalData.Gotpremit){
      wx.navigateTo({
        url: '../index/index',
      })
    }
    else{
      wx.login({
        success: res => {
        }
      })

      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo,
                app.globalData.isLogin = true,
                app.globalData.Gotpremit = true,
                wx.navigateTo({
                  url: '../index/index',
                })
              },
              fail: res => {
                wx.showToast({
                  title: '获取数据失败，请检查您的网络连接后重试',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
          else{
            app.globalData.Gotpremit = true
          }
        },
        fail: res => {
          wx.showToast({
            title: '获取数据失败，请检查您的网络连接后重试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },

  placeshow: function(){
    wx.navigateTo({
      url: '../allplace/allplace',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.Gotpremit){
      wx.showLoading({
        title: '获取数据中...',
        mask: true
      })

      wx.login({
        success: res => {
        }
      })

      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo,
                app.globalData.isLogin = true,
                app.globalData.Gotpremit = true,
                wx.hideLoading()
              },
              fail: res => {
                wx.hideLoading({
                  success: (res) => {
                    setTimeout(() => {
                      wx.showToast({
                        title: '获取数据失败，请检查您的网络连接',
                        icon: 'none',
                        duration: 2000
                      })
                    }, 500);
                  },
                })
              }
            })
          }
          else{
            wx.hideLoading();
            app.globalData.Gotpremit = true
          }
        },
        fail: res => {
          wx.hideLoading({
            success: (res) => {
              setTimeout(() => {
                wx.showToast({
                  title: '获取数据失败，请检查您的网络连接',
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