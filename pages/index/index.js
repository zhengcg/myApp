//index.js
//获取应用实例
var app = getApp();
var api=app.globalData.api;
var header = app.globalData.header
Page({
  data:{
    imgUrls:[],
    region: [],
    regionIndex: 0,
    industry: [],
    industryIndex:0,
    list:[],
    page:1

  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载

  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    this.getBanner();
    this.getRegion();
    this.getList();
    this.getIndustry();


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
    this.setData({
      regionIndex:e.detail.value
    })

  },
  changeIndustry:function(e){
   this.setData({
     industryIndex: e.detail.value
   })
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
        session_3rd: 'bfc0cd4caaa1d4e98b5d71dd33d69042'
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
        session_3rd: 'bfc0cd4caaa1d4e98b5d71dd33d69042'
      },
      method: 'GET',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          self.setData({
            industry: res.data.data
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
        session_3rd: 'bfc0cd4caaa1d4e98b5d71dd33d69042'
      },
      method: 'GET',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          self.setData({
            region: res.data.data
          })
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
      url: api +'getList', //仅为示例，并非真实的接口地址
      data: {
        count: 10,
        page: self.data.page,
        session_3rd: 'bfc0cd4caaa1d4e98b5d71dd33d69042'
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
  }
})