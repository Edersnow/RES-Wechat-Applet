var app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */

  //variable
  data: {
    img_urls:[
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Changting1.jpg",
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Changting2.jpg",
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Changting3.jpg",
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Changting4.jpg",
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Changting5.jpg"
    ],

    page_title:'长汀4A红色旧址群旅游区',

    switchers:[
      "景点简介",
      "详细信息",
      "评论区"
    ],

    BI_contents: "        长汀是著名的革命老区、原中央苏区核心区、原中央苏区经济、文化中心，被誉为“红色小上海”,也是红军长征主要出发地之一。周恩来总理赞誉“汀州之繁盛，简直为全国苏区之冠”。朱德总司令评价“长汀果然是中国革命历史的一个转折点”。福建省苏维埃政府的成立，标志着福建苏区的革命斗争进入了一个全盛时期，长汀成为福建红色区域的首府和政治、军事、经济、文化的中心，在开展革命战争、建设和保卫苏区方面作出了不可磨灭的贡献。",

    DI_contents: [{
      title : "景区级别",
      icon_url : "../../icons/level.svg",
      contents : "AAAA"
    },{
      title : "地址",
      icon_url : "../../icons/address.svg",
      contents : "长汀县兆征路"
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
      content : "0597-3361210"
    },{
      title : "营业时间",
      icon_url : "../../icons/time.svg",
      content : "每天8:00-17:30"
    },{
      title : "交通方式",
      icon_url : "../../icons/tour.svg",
      content : "坐动车抵达长汀南站后，乘坐3路或5路公交车到达济川门，票价2元，车程约40分钟，或者提前订好网约车（约30分钟）"
    },{
      title : "包含景点信息",
      icon_url : "../../icons/attention.svg",
      content : "长汀红色旧址群旅游区中含有众多红色景点：\n · 全国重点文物保护单位福建省苏维埃政府旧址——汀州试院\n · 中央红色医院前身——福音医院\n · 红四军司令部、政治部旧址——辛耕别墅\n · 全国重点烈士纪念建筑物保护单位——瞿秋白烈士纪念园"
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
    app.globalData.map_longitude = "116.355866",
    app.globalData.map_latitude = "25.836342"
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
    if (Math.abs(res.longitude - 116.355866) * transform < 1.5 && Math.abs(res.latitude - 25.836342) * transform < 1.5){
      db.collection('SignRecorder').doc(app.globalData.openId).update({

        //variable
        data: {
          Changting: true
        },
        success: function(res){
          that.setData({
            isSigned : true,
            isLoading : false
          }),

          //variable
          app.globalData.sign_in.Changting = true,
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
    app.globalData.comment_target = 'Changting',
    wx.navigateTo({
      url: '../comments/comments',
    })
  },

  GetInfo: function(e) {
    if ("userInfo" in e.detail){
      app.globalData.isLogin = true
      app.globalData.userInfo = e.detail.userInfo

      //variable
      app.globalData.comment_target = 'Changting'
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
    db.collection('Changting').get({
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
          db.collection('Changting').doc(res.currentTarget.dataset._id).remove({
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
      isSigned : app.globalData.sign_in.Changting,
      isLogin : app.globalData.isLogin,
      openId: app.globalData.openId
    })

    /*获取天气数据*/
    wx.request({

      //variable
      url: 'https://restapi.amap.com/v3/weather/weatherInfo?key=4483144043f6722e135a98987380ebeb&city=350821&extensions=base',
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
    db.collection('Changting').get({
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