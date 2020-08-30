// pages/comments/comments.js
var app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    target: '',
    userInfo: null
  },

  submit_comment: function(res){
    var that=this
    that.setData({
      isLoading : true
    })

    var tmp_date = Date.parse(new Date())
    var date = new Date(tmp_date)
    var Y = '' + (date.getFullYear());
    var M = '' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = '' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

    if (res.detail.value.content.length == 0){
      that.setData({
        isLoading : false
      })
      wx.showToast({
        title: '请输入内容后发表',
        icon: 'none',
        duration: 2000
      })
    }
    else{
      wx.cloud.callFunction({
        name:'checkMessage',
        data:{
          content: res.detail.value.content
        },
        success(ckres){
          if (ckres.result.errCode == 0){
            db.collection(that.data.target).add({
              data: {
                content: res.detail.value.content,
                name: that.data.userInfo.nickName,
                headUrl: that.data.userInfo.avatarUrl,
                year: Y,
                month: M,
                day: D
              },
              success: function(e){
                that.setData({
                  isLoading : false
                })
                wx.showToast({
                  title: '发表成功！',
                  duration: 1500,
                  mask: true,
                  complete: function(){
                    setTimeout(() => {
                      var pages = getCurrentPages();
                      var prevPage= pages[pages.length - 2];
                      wx.navigateBack({
                        success: function() {
                            prevPage.update_comment();
                        }
                      });
                    }, 1500);
                  }
                })
              },
              fail: function(res){
                that.setData({
                  isLoading : false
                })
                wx.showToast({
                  title: '发表失败，请检查您的网络连接',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }else{
            that.setData({
              isLoading : false
            })
            wx.showToast({
              title: '您的信息中包含敏感用语，提交失败！',
              icon: 'none',
              duration: 3000
            })
          }
        },
        fail(ckres){
          that.setData({
            isLoading : false
          })
          wx.showToast({
            title: '发表失败，请检查您的网络连接',
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
    this.setData({
      target: app.globalData.comment_target,
      userInfo: app.globalData.userInfo
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