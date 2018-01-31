// pages/label/label.js
var app = getApp();
var api = app.globalData.api;
var header = app.globalData.header
Page({
  data:{
    page:1,
    list:[],
    selected:0
  },
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
  gotoModel:function(){
    wx.navigateTo({
      url: '../model/model'
    })
  },
  gotoDetail:function(){
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  selected0:function(){
    this.setData({
      selected:0
    })

  },
  selected1: function () {
    this.setData({
      selected: 1
    })

  }
})