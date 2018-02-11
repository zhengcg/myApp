var app = getApp();
var api = app.globalData.api;
var header = app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    price:0,
    text:'',
    list:[]
  
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
    this.getList();
  
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
      url: api + 'goodsList', //仅为示例，并非真实的接口地址
      data: {
        session_3rd: wx.getStorageSync('token')
      },
      method: 'GET',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          self.setData({
            list:res.data.data
          })
        } else if (res.data.code == 401) {
          wx.navigateTo({
            url: '../login/login'
          })
        }
      }
    })
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
  radioChange: function (e) {
    var self=this;
    this.setData({
      price: self.data.list[e.detail.value].amount,
      id: self.data.list[e.detail.value].id
    })
  },
  changeText:function(e){
    this.setData({
      text: e.detail.value
    })
  },
  payFn(){
    var self = this;
    if(self.data.id){
      try {
        wx.showLoading({
          title: '加载中',
        })
      } catch (err) {
        console.log("当前微信版本不支持")
      }
      wx.request({
        url: api + 'addorder', //仅为示例，并非真实的接口地址
        data: {
          session_3rd: wx.getStorageSync('token'),
          goods_id: self.data.id

        },
        method: 'GET',
        success: function (res) {
          try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
          if (res.data.code == 200) {
            wx.requestPayment({
              'timeStamp': res.data.data.timeStamp,
              'nonceStr': res.data.data.nonceStr,
              'package': res.data.data.package,
              'signType': 'MD5',
              'paySign': res.data.data.paySign,
              'success': function (res) {
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.navigateTo({
                  url: '../index/index'
                })
              },
              'fail': function (res) {
                wx.showToast({
                  title: '支付失败',
                  icon: 'success',
                  duration: 2000,
                  success: function () {


                  }
                })
              }
            })

          } else if (res.data.code == 401) {
            wx.navigateTo({
              url: '../login/login'
            })
          }
        }
      })

    }else{
      wx.showModal({
        title: '提示',
        content: '请选择购买活动次数',
        showCancel: false
      })
    }
 
    
  }
})