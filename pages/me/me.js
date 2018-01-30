// pages/me/me.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成

  },
  onShow:function(){
    // 页面显示
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
  }
})