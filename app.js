App({
  onLaunch: function(options) {
    // Do something initial when launch.

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

  globalData:{
    api: 'https://appdev.qigle.com/bargain/api/bargain/',
    session_3rd: wx.getStorageSync('token')||'',
    user_id: wx.getStorageSync('user')||'',
    header: {
      'content-type': 'application/json',
    }
  }
})