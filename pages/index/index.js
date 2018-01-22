//index.js
//获取应用实例
var app = getApp()
Page({
  data:{
    imgUrls:[{src:"../../images/skin/01.jpg",id:1}],
    labels:[
      {id:1,text:'html5'},
      {id:2,text:'javascript'},
      {id:3,text:'css'},
      {id:4,text:'css3'},
      {id:5,text:'bootstrap'},
      {id:6,text:'nodejs'},
      {id:7,text:'mongodb'},
      {id:8,text:'json'},
      {id:9,text:'ajax'},
      {id:10,text:'jquery'},
      {id:11,text:'angularjs'},
      {id:12,text:'vuejs'}
      ],
      array: ['北京', '上海', '深圳', '广州'],
      index: 0,
      array1: ['金融P2P', '互联网', '电商', '物流'],
      index1: 0

  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载

  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow:function(){
    // 生命周期函数--监听页面显示

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

  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  gotoSearch:function(e){
    wx.navigateTo({
      url: '../search/search'
    })
  }
})