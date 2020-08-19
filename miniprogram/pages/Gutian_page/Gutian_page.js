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
      "../../test_img/Gutian_page1.jpg",
      "../../test_img/Gutian_page2.jpg"
    ],

    BI_contents: "    古田会议会址，原为“廖氏宗祠”，又名“万源祠”。位于福建省龙岩市上杭县古田镇采眉岭笔架山下。会址座东朝西。始建于清宣宗道光二十八年（1848年）的单层歇山四合院式砖木结构宗祠建筑。祠堂由前后厅和左右厢房组成，建筑面积826平方米。后改为和声小学校址。民国十八年（1929年）五月，红军第一次挺进闽西古田，改名为“曙光小学”。12月，毛泽东同志主持的红四军第九次代表大会在此召开，通过了具有历史意义的古田会议决议案。1961年3月，国务院将古田会议旧址列为第一批全国重点文物保护单位。",

    DI_contents: [{
      title : "地址",
      icon_url : "../../icons/address.svg",
      contents : "上杭县古田镇古田路"
    },{
      title : "联系电话",
      icon_url : "../../icons/telephone.svg",
      contents : "0597-3641143"
    },{
      title : "天气",
      icon_url : "../../icons/weather.svg",
      contents : "晴"
    }],

    DI_nexts: [{
      title : "地图定位",
      icon_url : "../../icons/routine.svg",
      next_url : "../../icons/next.svg",
      function_name : "ChangeLocation",
      target : "../maps/maps"
    }],

    RC_contents: [{
      title : "推荐出行方式",
      icon_url : "../../icons/tour.svg",
      content : "    因为市内没有直达景区的公交车，可乘坐当地出租车或包车前往。沿319国道向古田方向开即可到古田会议旧址。"
    },{
      title : "推荐食宿",
      icon_url : "../../icons/food.svg",
      content : "    古田会议旧址食宿是怎么回事呢？古田会议旧址相信大家都很熟悉，但是古田会议旧址食宿是怎么回事呢，下面就让小编带大家一起了解吧。古田会议旧址食宿，其实就是吃饭和睡觉，大家可能会很惊讶古田会议旧址怎么会食宿呢？但事实就是这样，小编也感到非常惊讶。这就是关于古田会议旧址食宿的事情了，大家有什么想法呢，欢迎在评论区告诉小编一起讨论哦！"
    },{
      title : "注意事项",
      icon_url : "../../icons/attention.svg",
      content : "    暂无"
    }],

    MB_contents : [],

    isSigned : false,
    isLoading : false,
    isLogin : false,
    isUpdating : false,
    isDeleting : false,
    openId : ''
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