//index.js
//获取应用实例
var app = getApp();
var api=app.globalData.api;
var header = app.globalData.header;
var session_3rd = app.globalData.session_3rd;
var user_id = app.globalData.user_id
Page({
  data:{
    imgUrls:[],
    region: [],
    regionIndex: 0,
    industry: [],
    industryIndex:0,
    list:[],
    page:1,
    area_id:'',
    industry_id:''

  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    

  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
      
    
  },
  checkToken: function () {
    var _this = this;
    wx.checkSession({
      success: function () {
        if (!wx.getStorageSync('token')) {
          _this.registerFn()
        } else {
          _this.getBanner(); 
          _this.getRegion();
          _this.getIndustry(); 
          
        }

      },
      fail: function () {
        _this.registerFn()
      }
    })

  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    this.checkToken()

  },
  registerFn: function () {
    var _this = this;
    try {
      wx.showLoading({
        title: '请求登录中',
      })
    }
    catch (err) {
      console.log("当前微信版本不支持")
    }

    wx.login({
      success: function (res) {
        if (res.code) {
          _this.sendLogin(res.code)

        } else {
          try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }

          wx.showToast({
            title: '调微信登录接口失败！',
            icon: 'fail',
            duration: 2000
          })
        }
      }
    });
  },
  sendLogin: function (code) {
    //发起网络请求
    var _this = this;
    wx.request({
      url: "https://appdev.qigle.com/bargain/api/user_mp/login",
      method: 'GET',
      data: {
        code: code
      },
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.setStorageSync('token', res.data.data.session_3rd);
              wx.setStorageSync('user', res.data.data.user_id);
              app.globalData.session_3rd = wx.getStorageSync('token')
              app.globalData.user_id = wx.getStorageSync('user')
              session_3rd = app.globalData.session_3rd;
              user_id = app.globalData.user_id
              _this.getBanner();
              _this.getRegion();
              _this.getIndustry(); 

            }
          })


        } else {
          wx.showToast({
            title: '失败',
            icon: 'fail',
            duration: 2000
          })

        }
      },
      fail: function () {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        wx.showToast({
          title: '接口调用失败！',
          icon: 'fail',
          duration: 2000
        })
      }
    })

  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏

  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    this.getList()

  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  changeRegion:function(e){
    var self=this;
    this.setData({
      regionIndex:e.detail.value,
      area_id: self.data.region[e.detail.value].area_id,
      page:1
    });
    this.getList()

  },
  changeIndustry:function(e){
    var self = this;
    this.setData({
      industryIndex: e.detail.value,
      industry_id: self.data.industry[e.detail.value].id,
      page:1
    })
    this.getList()
  },
  gotoSearch:function(e){
    wx.navigateTo({
      url: '../search/search'
    })

  },
  getBanner:function(){
    var self=this;
    try {
      wx.showLoading({
        title: '加载中',
      })
    } catch (err) {
      console.log("当前微信版本不支持")
    }
    wx.request({
      url: api + 'index_banner', //仅为示例，并非真实的接口地址
      data: {
        session_3rd: session_3rd
      },
      method: 'GET',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          self.setData({
            imgUrls: res.data.data.split(",")
          })
          
        }
      }
    })

  },
  getIndustry:function(){
    var self = this;
    try {
      wx.showLoading({
        title: '加载中',
      })
    } catch (err) {
      console.log("当前微信版本不支持")
    }
    wx.request({
      url: api + 'bargain_industry', //仅为示例，并非真实的接口地址
      data: {
        session_3rd: session_3rd
      },
      method: 'GET',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          self.setData({
            industry: res.data.data,
            industry_id: res.data.data[self.data.industryIndex].id
          })
        }
      }
    })

  },
  getRegion:function(){
    var self = this;
    try {
      wx.showLoading({
        title: '加载中',
      })
    } catch (err) {
      console.log("当前微信版本不支持")
    }
    wx.request({
      url: api + 'bargain_area', //仅为示例，并非真实的接口地址
      data: {
        session_3rd: session_3rd
      },
      method: 'GET',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          self.setData({
            region: res.data.data,
            area_id: res.data.data[self.data.regionIndex].area_id
          })
          self.getList(); 
        }
      }
    })



  },
  getList:function(){
    var self=this;
    try {
      wx.showLoading({
        title: '加载中',
      })
    } catch (err) {
      console.log("当前微信版本不支持")
    }    
    wx.request({
      url: api +'bargainSearch', //仅为示例，并非真实的接口地址
      data: {
        count: 10,
        page: self.data.page,
        industry_id:self.data.industry_id,
        area_id: self.data.area_id,
        session_3rd: session_3rd
      },
      method:'GET',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }  
        if (res.data.code==200){
          if (res.data.data.length){
            self.setData({
              page: self.data.page + 1,
              list: self.data.list.concat(res.data.data),
            })
          }else{
            wx.showToast({
              title: '没有了！',
              icon: 'fail',
              duration: 2000
            })
          }
        }
      }
    })
  },
  gotoDetail:function(e){
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id + "&type=" + e.currentTarget.dataset.type
    })
  }
})