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
    header: {
      'content-type': 'application/json',
      'session_3rd':'a1lvsTSQePnzweICAMHg=='
    }
  }
})