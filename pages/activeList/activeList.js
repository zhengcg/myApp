var app = getApp();
var api = app.globalData.api;
var header = app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    duiBox:false,
    list: [],
    page: 1,
    keyWord: ''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getList()
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList()
  
  },
  sendMsg: function (e) {
    if (e.detail.value) {
      this.setData({
        keyWord: e.detail.value,
        page: 1
      })
      this.getList()
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入搜索关键词',
        showCancel: false
      })
    }

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
      url: api + 'myapplyList', //仅为示例，并非真实的接口地址
      data: {
        count: 10,
        page: self.data.page,
        key: self.data.keyWord,
        session_3rd: 'bfc0cd4caaa1d4e98b5d71dd33d69042'
      },
      method: 'GET',
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  showDui:function(){
    
    this.setData({ duiBox: true })
  },
  hideDui:function () {
    this.setData({ duiBox: false })
  },
  gotoStatic:function(){
    wx.navigateTo({
      url: '../static/static'
    })
  }
})