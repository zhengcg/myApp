// pages/detail/detail.js
var app = getApp();
var api = app.globalData.api;
var header = app.globalData.header;
var session_3rd = app.globalData.session_3rd;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    type:'',
    typeClass:'type1',
    info:{

    },
    rule:[],
    description:[],
    org_description:[]


  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      type:options.type
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.type == 1) {
      this.setData({
        typeClass: 'type1'
      })
    } else if (this.data.type == 2) {
      this.setData({
        typeClass: 'type2'
      })
    } else {
      this.setData({
        typeClass: 'type3'
      })
    }
    this.getDetail();
  
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
    var self=this;
    return {
      title: '商家小屋',
      path: '/detail/detail?id='+self.data.id+'&type='+self.data.type,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }

  },
  wcy(){
    this.checkToken(1)
  },
  bkj(){
    this.checkToken(2)
  },
  checkToken: function (i) {
    var _this = this;
    wx.checkSession({
      success: function () {
        if (!wx.getStorageSync('token')) {
          _this.registerFn(i)
        } else {
          if(i==1){
            _this.joinFn();
          }else{
            _this.helpCut();
          }
          

        }
      },
      fail: function () {
        _this.registerFn(i)
      }
    })

  },
  registerFn: function (i) {
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
          _this.sendLogin(res.code,i)

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
  sendLogin: function (code,i) {
    //发起网络请求
    var _this = this;
    wx.request({
      url: "https://appdev.qigle.com/bargain/api/user_mp/login",
      method: 'GET',
      data: {
        code: code
      },
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
              app.globalData.session_3rd = wx.getStorageSync('token')
              app.globalData.user_id = wx.getStorageSync('user')
              session_3rd = app.globalData.session_3rd;
              user_id = app.globalData.user_id
              if (i == 1) {
                _this.joinFn();
              } else {
                _this.helpCut();
              }

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
  joinFn(){
    var self = this;
    try {
      wx.showLoading({
        title: '加载中',
      })
    } catch (err) {
      console.log("当前微信版本不支持")
    }
    wx.request({
      url: api + 'apply', //仅为示例，并非真实的接口地址
      data: {
        bargain_id: self.data.id,
        session_3rd: session_3rd
      },
      method: 'GET',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          wx.showToast({
            title: '参与成功！',
            icon: 'fail',
            duration: 2000
          })
        }
      }
    })


  },
  helpCut(){
    var self = this;
    try {
      wx.showLoading({
        title: '加载中',
      })
    } catch (err) {
      console.log("当前微信版本不支持")
    }
    wx.request({
      url: api + 'save_history', //仅为示例，并非真实的接口地址
      data: {
        apply_id: '',
        session_3rd: session_3rd
      },
      method: 'GET',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          wx.showToast({
            title: '帮朋友砍价成功！',
            icon: 'fail',
            duration: 2000
          })
        }
      }
    })

  },
  getDetail:function(){
    var self = this;
    try {
      wx.showLoading({
        title: '加载中',
      })
    } catch (err) {
      console.log("当前微信版本不支持")
    }
    wx.request({
      url: api + 'bargain_detail', //仅为示例，并非真实的接口地址
      data: {
        bargain_id:self.data.id,
        session_3rd: session_3rd
      },
      method: 'GET',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          self.setData({
            info:res.data.data,
            type: res.data.data.type,
            description: JSON.parse(res.data.data.description),
            org_description: JSON.parse(res.data.data.org_description),
            rule: res.data.data.rule.split(",")
          })
        }
      }
    })
  }
})