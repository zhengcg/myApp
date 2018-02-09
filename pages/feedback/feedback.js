var app = getApp();
var api = app.globalData.api;
var header = app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggestion:'',
    phone:''
    
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
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  suggestion: function (e) {
    this.setData({
      suggestion: e.detail.value
    })
  },
  sendMsg: function () {
    var self = this;

    if (this.validate()) {
      try {
        wx.showLoading({
          title: '加载中',
        })
      } catch (err) {
        console.log("当前微信版本不支持")
      }
      wx.request({
        url: api + 'suggestion', //仅为示例，并非真实的接口地址
        data: {
          suggestion: self.data.suggestion,
          
          phone: self.data.phone,
          
          session_3rd: wx.getStorageSync('token')
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
          } else if (res.data.code == 401) {
            wx.navigateTo({
              url: '../login/login'
            })
          }
        }
      })


    }

  },
  validate: function () {

    
    if (this.data.phone == "") {
      wx.showModal({
        title: '提示',
        content: '请输入手机号',
        showCancel: false
      })
      return false

    } else if (!(/^1[34578]\d{9}$/.test(this.data.phone))) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel: false
      })
      return false

    } else if (this.data.suggestion == "") {
      wx.showModal({
        title: '提示',
        content: '请输入意见',
        showCancel: false
      })
      return false
    } else {
      return true
    }
  }
})