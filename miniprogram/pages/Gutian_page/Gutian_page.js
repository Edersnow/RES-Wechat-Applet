// pages/Gutian_page/Gutian_page.js
var app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_urls:[
      "../../test_img/Gutian_head.jpg",
      "../../test_img/Gutian_page1.jpg"
    ],

    page_title:'龙岩市古田旅游区',

    switchers:[
      "景点简介",
      "详细信息",
      "评论区"
    ],

    BI_contents: "    古田旅游区位于龙岩市上杭县古田镇，景区内人文自然资源丰富。1929年12月底，中国工农红军红四军第九次代表大会（史称“古田会议”）在这里召开。会议确定了思想建党、政治建军、党指挥枪的原则，成为我党我军建设史上具有里程碑意义的会议。2015年10月，古田旅游区成功晋级为国家5A级旅游景区，荣获“全国十大优秀爱国主义教育基地”“全国红色旅游经典景区”“全国中小学生研学实践教育基地”等荣誉称号，现已成为福建省“十大”精品景区和红色旅游龙头，是全国红色旅游十大精品线路的核心景区",

    DI_contents: [{
      title : "景区级别",
      icon_url : "../../icons/level.svg",
      contents : "AAAAA"
    },{
      title : "地址",
      icon_url : "../../icons/address.svg",
      contents : "上杭县古田镇古田路"
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
      content : "0597-3609366\n0597-3609390"
    },{
      title : "营业时间",
      icon_url : "../../icons/time.svg",
      content : "夏令时：每天08:00-18:00（17:30停止入场）\n冬令时：每天08:00-17:30（17:00停止入场）\n疫情期间：每天08:30-16:30"
    },{
      title : "交通方式",
      icon_url : "../../icons/tour.svg",
      content : "自驾：\n厦门-龙岩-古田，厦蓉高速公路，全程约200公里，车行约3小时\n福州-龙岩-古田，沈海高速进厦蓉高速，全程430公里，车行约6小时\n\n高铁动车：\n经停古田会址站的动车一天有24趟，通往厦门、福州、深圳、赣州、南昌、瑞金、上海、南京、长汀、冠豸山等地\n\n火车：\n经停古田会址站的火车一天有3趟，通往厦门、北京、和郑州等地\n\n公共交通：\n哈罗共享单车服务项目在8个核心区域投放了200余辆；国家电网古田分公司投放4部共享新能源汽车，开通红古田公交专线（古田会址动车站至市委党校公交专线），沿途设置11个公交站点；开通古龙公交专线，共6个班次15个站点，每半小时一班次；开通红古田“古田至坪铺”公交车，共5个班次9个站点，每40分钟一班次"
    },{
      title : "预计游玩时长",
      icon_url : "../../icons/time.svg",
      content : "约两个小时"
    },{
      title : "其它事项",
      icon_url : "../../icons/attention.svg",
      content : "暂无"
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

  ChangeLocation: function (){
    app.globalData.map_longitude = "116.827240",
    app.globalData.map_latitude = "25.216220"
  },

  Sign: function(){
    var that=this;
    that.setData({
      isLoading: true
    })
    db.collection('SignRecorder').doc(app.globalData.openId).update({
      data: {
        Gutian: true
      },
      success: function(res){
        that.setData({
          isSigned : true,
          isLoading : false
        }),
        app.globalData.sign_in.Gutian = true,
        wx.showToast({
          title: '签到成功！',
        })
      }
    })
  },

  Comment: function(){
    app.globalData.comment_target = 'Gutian',
    wx.navigateTo({
      url: '../comments/comments',
    })
  },

  GetInfo: function(e) {
    if ("userInfo" in e.detail){
      app.globalData.isLogin = true
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.comment_target = 'Gutian'
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
    db.collection('Gutian').get({
      success: function(res){
        that.setData({
          MB_contents: res.data.reverse(),
          isUpdating: false
        })
        wx.showToast({
          title: '刷新成功！'
        })
      },
      fail: function(res){
        wx.showToast({
          title: '刷新失败',
          icon: 'none'
        })
      }
    })
  },

  delete_message: function(res){
    var that=this
    that.setData({
      isDeleting: true
    })
    db.collection('Gutian').doc(res.currentTarget.dataset._id).remove({
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
          title: '删除失败',
          icon: 'none'
        })
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
      isSigned : app.globalData.sign_in.Gutian,
      isLogin : app.globalData.isLogin,
      openId: app.globalData.openId
    })

    /*获取天气数据*/
    wx.request({
      url: 'https://restapi.amap.com/v3/weather/weatherInfo?key=4483144043f6722e135a98987380ebeb&city=110101&extensions=base',
      method: 'GET',
      success: function(res){
        that.setData({
          'DI_contents[2].contents' : res.data.lives[0].weather+' '+res.data.lives[0].temperature + '°C'
        })
      }
    })

    //获取评论数据
    db.collection('Gutian').get({
      success: function(res){
        that.setData({
          MB_contents: res.data.reverse()
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