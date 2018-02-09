// pages/label/label.js
var app = getApp();
var api = app.globalData.api;
var header = app.globalData.header;
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
  gotoModel:function(e){
    var self=this;
    wx.request({
      url: api + 'seller_detail', //仅为示例，并非真实的接口地址
      data: {
        session_3rd: wx.getStorageSync('token')
      },
      method: 'GET',
      success: function (res) {
        if (res.data.code == 200) {
          wx.navigateTo({
            url: '../model/model?type=' + e.currentTarget.dataset.type
          })
        } else if (res.data.code == 401) {
          wx.navigateTo({
            url: '../login/login'
          })
        } else {
             wx.navigateTo({
                url: '../info/info?type=' + e.currentTarget.dataset.type
              })
        }
      }
    })
    
  },
  gotoDetail:function(e){
      wx.navigateTo({
        url: '../detail/detail?type=' + e.currentTarget.dataset.type
      })
   
   
  },
  selected:function(e){
    this.setData({
      selected: e.currentTarget.dataset.type
    })

  }

})