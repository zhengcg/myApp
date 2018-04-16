// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  checkToken: function () {
    var _this = this;
    wx.checkSession({
      success: function () {
          _this.registerFn()       
      },
      fail: function () {
        _this.registerFn()
      }
    })

  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    this.checkToken()

  },
  registerFn: function () {
    var _this = this;
    try {
      wx.showLoading({
        title: '请求登录中',
      })
    }
    catch (err) {
      console.log("当前微信版本不支持")
    }

    wx.login({
      success: function (res) {
        if (res.code) {
          _this.getUserInfo(res.code)

        } else {
          try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }

          wx.showToast({
            title: '调微信登录接口失败！',
            icon: 'fail',
            duration: 2000
          })
        }
      }
    });
  },
  sendLogin: function (obj) {
    //发起网络请求
    var _this = this;
    wx.request({
      url: "https://appdev.qigle.com/bargain/api/user_mp/login",
      method: 'POST',
      data: obj,
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.setStorageSync('token', res.data.data.session_3rd);
              wx.setStorageSync('user', res.data.data.user_id);
              wx.switchTab({
                url: '../index/index'
              })

            }
          })

        } else {
          wx.showToast({
            title: '失败',
            icon: 'fail',
            duration: 2000
          })

        }
      },
      fail: function () {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        wx.showToast({
          title: '接口调用失败！',
          icon: 'fail',
          duration: 2000
        })
      }
    })

  },
  getUserInfo: function (code) {
    var _this = this;
    wx.getUserInfo({
      withCredentials: true,
      lang: "zh_CN",
      success: function (res) {
        var sendData = {
          "code": code,
          "nickName": res.userInfo.nickName,
          "gender": res.userInfo.gender,
          "avatarUrl": res.userInfo.avatarUrl,
          "province": res.userInfo.province,
          "city": res.userInfo.city,
          "county": res.userInfo.county
        }
        _this.sendLogin(sendData)

      }
    })
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
  
  }
})