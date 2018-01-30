// pages/info/info.js
var app = getApp();
var api = app.globalData.api;
var header = app.globalData.header
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    regionIndex: 0,
    industry: [],
    industryIndex: 0,
    orgName:'',
    name:'',
    phone:'',
    code:''
    
  
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
    this.getRegion();
    this.getIndustry();
  
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getIndustry: function () {
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
  getRegion: function () {
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
  changeRegion: function (e) {
    this.setData({
      regionIndex: e.detail.value
    })

  },
  changeIndustry: function (e) {
    this.setData({
      industryIndex: e.detail.value
    })
  },
  sendMsg:function(){
    var self=this;

    if(!this.validate()){
      try {
        wx.showLoading({
          title: '加载中',
        })
      } catch (err) {
        console.log("当前微信版本不支持")
      }
      wx.request({
        url: api + 'save_seller', //仅为示例，并非真实的接口地址
        data: {
          org_name:self.data.orgName,
          industry_id: self.data.industry[self.data.industryIndex].id,
          area_id: self.data.region[self.data.regionIndex].area_id,
          name:self.data.name,
          phone:self.data.phone,
          code:self.data.code,
          session_3rd: 'bfc0cd4caaa1d4e98b5d71dd33d69042'
        },
        // header: { "Content-Type": "application/x-www-form-urlencoded" },
        method: 'POST',
        success: function (res) {
          try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
          if (res.data.code == 200) {
            wx.showToast({
              title: '提交成功！',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })


    }

  },
  validate:function(){
    
    if (this.data.orgName==""){
      wx.showModal({
        title: '提示',
        content: '请输入机构名称',
        showCancel: false
      })
      return false
    }else if(this.data.name==""){
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
        showCancel: false
      })
      return false

    }else if(this.data.phone==""){
      wx.showModal({
        title: '提示',
        content: '请输入手机号',
        showCancel: false
      })
      return false

    } else if (this.data.code==""){
      wx.showModal({
        title: '提示',
        content: '请输入验证码',
        showCancel: false
      })
      return false
    }else{
      return true
    }
  }
})