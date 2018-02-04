// pages/label/label.js
var app = getApp();
var api = app.globalData.api;
var header = app.globalData.header;
var session_3rd = app.globalData.session_3rd;
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
    if (this.goWhere()){
      wx.navigateTo({
        url: '../model/model?type=' + e.currentTarget.dataset.type
      })
    }else{
      wx.navigateTo({
        url: '../info/info?type=' + e.currentTarget.dataset.type
      })
    }
    
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

  },
  goWhere: function () {
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
          session_3rd: session_3rd
        },
        method: 'GET',
        success: function (res) {
          try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
          if (res.data.code == 200) {
              return true;
          }else{
            return false
          }
        }
      })

  }

})