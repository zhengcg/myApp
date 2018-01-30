// pages/label/label.js
var app = getApp();
var api = app.globalData.api;
var header = app.globalData.header
Page({
  data:{
    page:1,
    list:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    this.getList();
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
  getList: function () {
    var self = this;
    try {
      wx.showLoading({
        title: '加载中',
      })
    } catch (err) {
      console.log("当前微信版本不支持")
    }
    wx.request({
      url: api + 'save_bargain', //仅为示例，并非真实的接口地址
      data: {
        session_3rd: 'bfc0cd4caaa1d4e98b5d71dd33d69042'
      },
      // header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          if (res.data.data.length) {
            self.setData({
              page: self.data.page + 1,
              list: self.data.list.concat(res.data.data),
            })
          } else {
            wx.showToast({
              title: '没有了！',
              icon: 'fail',
              duration: 2000
            })
          }
        }
      }
    })
  }
})