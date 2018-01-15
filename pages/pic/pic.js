// pages/pic/pic.js
Page({
  data:{
    pics:['../../images/skin/01.jpg','../../images/skin/02.jpg','../../images/skin/03.jpg','../../images/skin/04.jpg']
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
  previewImage: function(e){
      var that = this,
      index = e.currentTarget.dataset.index,
      pictures = this.data.pics;
      console.log(pictures[index])
      wx.previewImage({
      current: pictures[index],
      urls: pictures
      })
    }
})