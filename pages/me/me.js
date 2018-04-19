// pages/me/me.js
var app = getApp();
var api = app.globalData.api;
var header = app.globalData.header;
Page({
  data:{
    nickName:'',
    avatarUrl:'',
    count:0,
    sCount:0

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    var self=this;
    if (!wx.getStorageSync('nickName')) {
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo
          wx.setStorageSync('nickName', userInfo.nickName);
          wx.setStorageSync('avatarUrl', userInfo.avatarUrl);
          self.setData({
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl
          })

        }
      })

    }else{
      self.setData({
        nickName: wx.getStorageSync('nickName'),
        avatarUrl: wx.getStorageSync('avatarUrl')
      })

    }
    

  },
  onShow:function(){
    // 页面显示
    this.getDetail()
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  gotoFeed:function(){
    wx.navigateTo({
      url: '../feedback/feedback'
    })
  },
  gotoRaider:function(){
    wx.navigateTo({
      url: '../raiders/raiders'
    })
  },
  gotoPro: function () {
    wx.navigateTo({
      url: '../problem/problem'
    })
  },
  gotoStart: function () {
    wx.navigateTo({
      url: '../getStart/getStart'
    })
  },
  gotoOrder: function () {
    wx.navigateTo({
      url: '../order/order'
    })
  },
  gotoActive: function () {
    wx.navigateTo({
      url: '../activeList/activeList'
    })
  },
  gotoPay: function () {
    wx.navigateTo({
      url: '../pay/pay'
    })
  },
  getDetail(){
    var self = this;
    try {
      wx.showLoading({
        title: '加载中',
      })
    } catch (err) {
      console.log("当前微信版本不支持")
    }
    wx.request({
      url: api + 'seller_detail', //仅为示例，并非真实的接口地址
      data: {
        session_3rd: wx.getStorageSync('token')
      },
      method: 'GET',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          self.setData({
            count: res.data.data.free_count,
            sCount:res.data.data.count
          })
        } else if (res.data.code == 401) {
          wx.navigateTo({
            url: '../login/login'
          })
        }
      }
    })
  }
})