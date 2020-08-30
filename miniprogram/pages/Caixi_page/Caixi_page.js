var app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */

  //variable
  data: {
    img_urls:[
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Caixi1.jpg",
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Caixi2.jpg",
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Caixi3.jpg",
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Caixi4.jpg",
      "cloud://testenv-ckzjq.7465-testenv-ckzjq-1302866771/Caixi5.jpg"
    ],

    page_title:'毛泽东才溪乡调查旧址景区',

    switchers:[
      "景点简介",
      "详细信息",
      "评论区"
    ],

    BI_contents: "        毛泽东才溪乡调查旧址景区位于享有“模范之乡”“将军之乡”“建筑之乡”“黄金宝地”美誉的上杭县才溪镇。新馆于2009年10月20日正式对外开放，包括四个展厅（毛泽东才溪乡调查展厅、九军十八师展厅、才溪英烈事迹展厅、今日才溪展厅）。陈列馆通过大量的文物、资料、照片反映了毛泽东在才溪的革命实践活动，介绍了才溪人民创建中央苏区模范区的光荣史实，展出了才溪“九军十八师”等老前辈在革命战争中，金戈铁马、叱咤风云的光辉历程，以及改革开放后，才溪人民又是如何续写中央苏区时期的光荣与典范，谱写了新时期的“模范之乡”，现为“全国百家爱国主义教育示范基地”。目前，景区列入“全国百家红色旅游经典景区”和“全国红色旅游精品线路”名录。",

    DI_contents: [{
      title : "景区级别",
      icon_url : "../../icons/level.svg",
      contents : "AAAA"
    },{
      title : "地址",
      icon_url : "../../icons/address.svg",
      contents : "上杭县才溪镇才溪村"
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
      content : "0597-3136912"
    },{
      title : "营业时间",
      icon_url : "../../icons/time.svg",
      content : "夏令：周一至周日08:00-17:30\n冬令：周一至周日08:00-18:00"
    },{
      title : "交通方式",
      icon_url : "../../icons/tour.svg",
      content : "自驾：\n龙岩—G76厦蓉高速—G25长深高速—205国道\n上杭—G25长深高速—205国道\n\n公共交通：\n到达上杭后可乘城际公交：上杭-南阳（途径才溪）；上杭-回龙（途径才溪）"
    },{
      title : "预计游玩时长",
      icon_url : "../../icons/time.svg",
      content : "约三个小时"
    },{
      title : "包含景点信息",
      icon_url : "../../icons/attention.svg",
      content : "毛泽东才溪乡调查旧址景区中含有众多红色景点：\n · 才溪区苏维埃政府旧址\n · 才溪区工委（列宁堂）\n · 毛泽东才溪乡调查纪念馆\n · 红军公田等"
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
    app.globalData.map_longitude = "116.418711",
    app.globalData.map_latitude = "25.250952"
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
    if (Math.abs(res.longitude - 116.418711) * transform < 0.8 && Math.abs(res.latitude - 25.250952) * transform < 0.8){
      db.collection('SignRecorder').doc(app.globalData.openId).update({

        //variable
        data: {
          Caixi: true
        },
        success: function(res){
          that.setData({
            isSigned : true,
            isLoading : false
          }),

          //variable
          app.globalData.sign_in.Caixi = true,
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
    app.globalData.comment_target = 'Caixi',
    wx.navigateTo({
      url: '../comments/comments',
    })
  },

  GetInfo: function(e) {
    if ("userInfo" in e.detail){
      app.globalData.isLogin = true
      app.globalData.userInfo = e.detail.userInfo

      //variable
      app.globalData.comment_target = 'Caixi'
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
    db.collection('Caixi').get({
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
          db.collection('Caixi').doc(res.currentTarget.dataset._id).remove({
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
      isSigned : app.globalData.sign_in.Caixi,
      isLogin : app.globalData.isLogin,
      openId: app.globalData.openId
    })

    /*获取天气数据*/
    wx.request({

      //variable
      url: 'https://restapi.amap.com/v3/weather/weatherInfo?key=4483144043f6722e135a98987380ebeb&city=350823&extensions=base',
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
    db.collection('Caixi').get({
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