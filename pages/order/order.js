var app = getApp();
var api = app.globalData.api;
var header = app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:false,
    list: [],
    page: 1,
    keyWord: '',
    type:1,
    codeImg:'',
    scene:""

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene);
    this.setData({
      scene:scene
    })
  
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
  tabFn:function(e){
    this.setData({
      type: e.currentTarget.dataset.type,
      page:1,
      keyWord:'',
      list:[]

    })
    this.getList()


  },
  sendMsg: function (e) {
    if (e.detail.value) {
      this.setData({
        keyWord: e.detail.value,
        page: 1,
        list:[]
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
      url: api + 'mybargainList', //仅为示例，并非真实的接口地址
      data: {
        count: 10,
        page: self.data.page,
        key: self.data.keyWord,
        type:self.data.type,
        session_3rd: wx.getStorageSync('token')
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
        } else if (res.data.code == 401) {
          wx.navigateTo({
            url: '../login/login'
          })
        }
      }
    })
  },
  gotoModel:function(e){
    wx.navigateTo({
      url: '../model/model?id=' + e.currentTarget.dataset.id + "&type=" + e.currentTarget.dataset.type
    })
  },
  gotoTable: function (e) {
    wx.navigateTo({
      url: '../table/table?id=' + e.currentTarget.dataset.id
    })
  },
  openCode:function(e){
    var self=this;
    // https://www.w3cschool.cn/weixinapp/weixinapp-api-qrcode.html
    wx.request({
      url: api + 'getqrcode', //仅为示例，并非真实的接口地址
      data: {
        session_3rd: wx.getStorageSync('token'),
        path: "pages/detail/detail",
        scene:e.currentTarget.dataset.id+"," + e.currentTarget.dataset.type
      },
      method: 'GET',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }

        self.setData({ code: true, codeImg: res.data.data })
      }
    })
    
  },
  closeCode:function(){
    this.setData({ code: false })
  },
  delete:function(e){
    var self=this;
    wx.showModal({
      title: '提示',
      content: '确定要删除该活动吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: api + 'delete_bargain', //仅为示例，并非真实的接口地址
            data: {
              session_3rd: wx.getStorageSync('token'),
              id: e.currentTarget.dataset.id
            },
            method: 'GET',
            success: function (res) {
              try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
              self.data.list.splice(e.currentTarget.dataset.index,1);
              self.setData({
                list: self.data.list
              })
             
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
  },
  saveImg:function(e){
    var self=this;
    wx.saveImageToPhotosAlbum({
      filePath: self.data.codeImg,
      success:function(res){
        wx.showToast({
          title: '以保存到相册',
          icon: 'success',
          duration: 2000
        })
      }
    })

  },
  gotoDetail: function (e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id + "&type=" + e.currentTarget.dataset.type
    })
  }
})