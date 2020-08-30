var app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */

  //variable
  data: {
    img_urls:[
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Dongxiao1.jpg",
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Dongxiao2.jpg",
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Dongxiao3.jpg",
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Dongxiao4.jpg"
    ],

    page_title:'东肖红色旧址群',

    switchers:[
      "景点简介",
      "详细信息",
      "评论区"
    ],

    BI_contents: "        东肖红色旧址群景区位于新罗区东肖镇。景区距离龙岩中心城区7公里，面积3.5平方公里。东肖素有革命老区、文化区和侨区之美誉，是邓子恢副总理的故乡，是新四军第二支队北上抗日的出发地。后田暴动打响福建农民武装暴动的第一枪，被誉为“闽西土地革命之先声”，创造了23年红旗不倒的奇迹，红色旅游资源非常丰富，是龙岩中心城区重要的红色教育基地。",

    DI_contents: [{
      title : "景区级别",
      icon_url : "../../icons/level.svg",
      contents : "AAA"
    },{
      title : "地址",
      icon_url : "../../icons/address.svg",
      contents : "新罗区白土街、后田西路"
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
      content : "0597-2206365"
    },{
      title : "营业时间",
      icon_url : "../../icons/time.svg",
      content : "夏季：周二至周日8:30-11:30、15:00-17:30\n冬季：周二至周日8:30-11:30、14:30-17:00"
    },{
      title : "交通方式",
      icon_url : "../../icons/tour.svg",
      content : "到达龙岩市区后乘坐公共交通，可搭2路公交车至东园小学站下车"
    },{
      title : "预计游玩时长",
      icon_url : "../../icons/time.svg",
      content : "约两个小时"
    },{
      title : "包含景点信息",
      icon_url : "../../icons/attention.svg",
      content : "东肖红色旧址群包含众多红色景点：\n · 龙岩华侨历史博物馆\n · 邓子恢纪念馆\n · 后田暴动旧址和陈列馆\n · 桐冈书院\n · 邓子恢故居\n · 新四军第二支队司令部旧址和纪念馆\n · 东肖红场"
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
    app.globalData.map_longitude = "117.007150",
    app.globalData.map_latitude = "24.997541"
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
    if (Math.abs(res.longitude - 117.007150) * transform < 2 && Math.abs(res.latitude - 24.997541) * transform < 2){
      db.collection('SignRecorder').doc(app.globalData.openId).update({

        //variable
        data: {
          Dongxiao: true
        },
        success: function(res){
          that.setData({
            isSigned : true,
            isLoading : false
          }),

          //variable
          app.globalData.sign_in.Dongxiao = true,
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
    app.globalData.comment_target = 'Dongxiao',
    wx.navigateTo({
      url: '../comments/comments',
    })
  },

  GetInfo: function(e) {
    if ("userInfo" in e.detail){
      app.globalData.isLogin = true
      app.globalData.userInfo = e.detail.userInfo

      //variable
      app.globalData.comment_target = 'Dongxiao'
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
    db.collection('Dongxiao').get({
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
          db.collection('Dongxiao').doc(res.currentTarget.dataset._id).remove({
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
      isSigned : app.globalData.sign_in.Dongxiao,
      isLogin : app.globalData.isLogin,
      openId: app.globalData.openId
    })

    /*获取天气数据*/
    wx.request({

      //variable
      url: 'https://restapi.amap.com/v3/weather/weatherInfo?key=4483144043f6722e135a98987380ebeb&city=350802&extensions=base',
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
    db.collection('Dongxiao').get({
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