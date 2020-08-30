var app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */

  //variable
  data: {
    img_urls:[
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Songmaoling1.jpg",
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Songmaoling2.jpg",
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Songmaoling3.jpg",
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Songmaoling4.jpg"
    ],

    page_title:'松毛岭战地遗址',

    switchers:[
      "景点简介",
      "详细信息",
      "评论区"
    ],

    BI_contents: "        松毛岭战地遗址是全国红色旅游经典景区。松毛岭位于连城与长汀交界处，南北横贯80多里，东西蜿蜒30多里，山高岭峻，松林茂密，是闽西往连城，长汀往赣南的必经之路。这里先后发生了影响中国革命历史的“朋口战役”“温（文）坊战斗”和“松毛岭战役”。松毛岭战役是红军长征前东线的最后一战，也是第五次反围剿决定性的一战，更是一场惨烈的一战。",

    DI_contents: [{
      title : "景区级别",
      icon_url : "../../icons/level.svg",
      contents : "AAA"
    },{
      title : "地址",
      icon_url : "../../icons/address.svg",
      contents : "连城县松毛岭"
    },{
      title : "天气",
      icon_url : "../../icons/weather.svg",
      contents : ""
    }],

    DI_nexts: [{
      title : "地图定位",
      icon_url : "../../icons/routine.svg",
      next_url : "../../icons/next.svg",
      function_name : "ChangeLocation",
      target : "../maps/maps"
    }],

    RC_contents: [{
      title : "联系电话",
      icon_url : "../../icons/telephone.svg",
      content : "0597-13959077880"
    },{
      title : "营业时间",
      icon_url : "../../icons/time.svg",
      content : "夏令时：周一至周日08:00-17:00，16:00停止入场\n冬令时：周一至周日 08:00-16:30，16:00停止入场"
    },{
      title : "交通方式",
      icon_url : "../../icons/tour.svg",
      content : "自驾：\n福州—福银高速—长深高速—连城\n厦门—厦蓉高速—长深高速—连城\n\n高铁动车：\n抵达冠豸山动车站\n\n公共交通：\n冠豸山动车站均有公交车抵达松毛岭战地遗址景区"
    },{
      title : "预计游玩时长",
      icon_url : "../../icons/time.svg",
      content : "约两个小时"
    }],

    MB_contents : [],

    isSigned : false,
    isLoading : false,
    isLogin : false,
    isUpdating : false,
    isDeleting : false,
    openId : '',
    chooseNum: 0
  },

  Changechoose: function(event){
    this.setData({
      chooseNum: event.currentTarget.dataset.index
    })
  },

  //variable
  ChangeLocation: function (){
    app.globalData.map_longitude = "116.597222",
    app.globalData.map_latitude = "25.571127"
  },

  Sign: function(){
    var that=this;
    that.setData({
      isLoading: true
    })

    wx.getSetting({
      success: (res) => {
        //拒绝过
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '提示',
            content: '打卡操作需要获取你的地理位置，请确认授权~',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    //授权成功
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.getLocation({
                        success (res){
                          that.inline_sign(res)
                        },
                        fail(res){
                          that.setData({
                            isLoading : false
                          }),
                          wx.showToast({
                            title: '打卡失败，请检查您的网络连接',
                            icon: 'none',
                            duration: 2000
                          })
                        }
                      })
                    }
                    //未授权
                    else {
                      that.setData({
                        isLoading : false
                      }),
                      wx.showToast({
                          title: '授权失败',
                          icon: 'none'
                      })
                    }
                  },
                  fail(res){
                    that.setData({
                      isLoading : false
                    }),
                    wx.showToast({
                      title: '打卡失败，请检查您的网络连接',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                })
              }
              else{
                that.setData({
                  isLoading : false
                })
              }
            }
          })
        }

        //初次进入
        else if (res.authSetting['scope.userLocation'] == undefined) {
          wx.authorize({
            scope: 'scope.userLocation',
            //成功授权
            success () {
              wx.getLocation({
                success (res){
                  that.inline_sign(res)
                },
                fail(res){
                  that.setData({
                    isLoading : false
                  }),
                  wx.showToast({
                    title: '打卡失败，请检查您的网络连接',
                    icon: 'none',
                    duration: 2000
                  })
                }
              })
            },
            fail (){
              that.setData({
                isLoading : false
              }),
              wx.showToast({
                title: '需要提供位置信息才能打卡~',
                icon: 'none',
                duration: 2500
              })
            }
          })
        }

        // 已授权
        else if (res.authSetting['scope.userLocation']) {
          wx.getLocation({
            success (res){
              that.inline_sign(res)
            },
            fail(res){
              that.setData({
                isLoading : false
              }),
              wx.showToast({
                title: '打卡失败，请检查您的网络连接',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      },



      fail(res){
        that.setData({
          isLoading : false
        }),
        wx.showToast({
          title: '打卡失败，请检查您的网络连接',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  inline_sign: function(res){
    var that = this;
    //经纬度与距离（公里）的转换度量
    var transform = 111.2;
    //限定打卡位置

    //variable
    if (Math.abs(res.longitude - 116.597222) * transform < 3 && Math.abs(res.latitude - 25.571127) * transform < 3){
      db.collection('SignRecorder').doc(app.globalData.openId).update({

        //variable
        data: {
          Songmaoling: true
        },
        success: function(res){
          that.setData({
            isSigned : true,
            isLoading : false
          }),

          //variable
          app.globalData.sign_in.Songmaoling = true,
          wx.showToast({
            title: '打卡成功！',
          })
        },
        fail: function(res){
          that.setData({
            isLoading : false
          }),
          wx.showToast({
            title: '打卡失败，请检查您的网络连接',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
    else{
      that.setData({
        isLoading : false
      }),
      wx.showToast({
        title: '请在景点附近打卡~',
        icon: 'none',
        duration: 2000
      })
    }
  },

  Comment: function(){

    //variable
    app.globalData.comment_target = 'Songmaoling',
    wx.navigateTo({
      url: '../comments/comments',
    })
  },

  GetInfo: function(e) {
    if ("userInfo" in e.detail){
      app.globalData.isLogin = true
      app.globalData.userInfo = e.detail.userInfo

      //variable
      app.globalData.comment_target = 'Songmaoling'
      this.setData({
        isLogin: true
      })
      wx.navigateTo({
        url: '../comments/comments',
      })
    }
  },

  errorFunction: function (event) {
    var index = event.currentTarget.dataset.index
    var img = 'MB_contents[' + index + '].headUrl'
    this.setData({
     [img]: '../../icons/default.svg'
    })
  },

  update_comment: function (){
    var that=this
    that.setData({
      isUpdating: true
    })

    //variable
    db.collection('Songmaoling').get({
      success: function(res){
        that.setData({
          MB_contents: res.data.reverse(),
          isUpdating: false
        })
      },
      fail: function(res){
        that.setData({
          isUpdating: false
        })
        wx.showToast({
          title: '刷新失败，请检查您的网络连接',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  delete_message: function(res){
    var that=this
    wx.showModal({
      title: '提示',
      content: '确定要删除这条评论吗？',
      success (re) {
        if (re.confirm) {
          that.setData({
            isDeleting: true
          })

          //variable
          db.collection('Songmaoling').doc(res.currentTarget.dataset._id).remove({
            success: function(re){
              wx.showToast({
                title: '删除成功！'
              })
              that.data.MB_contents.splice(res.currentTarget.dataset.index, 1)
              that.setData({
                MB_contents: that.data.MB_contents,
                isDeleting: false
              })
            },
            fail: function(re){
              wx.showToast({
                title: '删除失败，请检查您的网络连接',
                icon: 'none',
                duration: 2000
              })
              that.setData({
                isDeleting: false
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    /*获取全局变量*/
    this.setData({

      //variable
      isSigned : app.globalData.sign_in.Songmaoling,
      isLogin : app.globalData.isLogin,
      openId: app.globalData.openId
    })

    /*获取天气数据*/
    wx.request({

      //variable
      url: 'https://restapi.amap.com/v3/weather/weatherInfo?key=4483144043f6722e135a98987380ebeb&city=350825&extensions=base',
      method: 'GET',
      success: function(res){
        that.setData({
          'DI_contents[2].contents' : res.data.lives[0].weather+' '+res.data.lives[0].temperature + '°C'
        })
      },
      fail: function(res){
        wx.showToast({
          title: '获取天气数据失败，请检查您的网络连接',
          icon: 'none',
          duration: 2000
        })
      }
    })

    //获取评论数据

    //variable
    db.collection('Songmaoling').get({
      success: function(res){
        that.setData({
          MB_contents: res.data.reverse()
        })
      },
      fail: function(res){
        wx.showToast({
          title: '获取评论数据失败，请检查您的网络连接',
          icon: 'none',
          duration: 2000
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