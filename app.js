App({
  onLaunch: function(options) {
    // Do something initial when launch.
    this.sendLogin()
    

  },
  onShow: function(options) {
      // Do something when show.
   
  },
  onHide: function() {
      // Do something when hide.
  },
  onError: function(msg) {
    console.log(msg)
  },
  sendLogin: function () {
    //发起网络请求
    var _this = this;
    wx.request({
      url: "https://appdev.qigle.com/bargain/api/user_mp/login",
      method: 'GET',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code==200) {          
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              _this.globalData.session_3rd = res.data.data.session_3rd;
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
  globalData:{
    api: 'https://appdev.qigle.com/bargain/api/bargain/',
    session_3rd:'',
    header: {
      'content-type': 'application/json',
    }
  }
})