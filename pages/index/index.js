//index.js
//获取应用实例
var app = getApp();
var api=app.globalData.api;
var header = app.globalData.header;
var session_3rd = app.globalData.session_3rd
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
    this.getRegion();
    this.getIndustry(); 

  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    this.getBanner();   
    
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
  }
})