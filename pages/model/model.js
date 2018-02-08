// pages/model/model.js
var app = getApp();
var api = app.globalData.api;
var header = app.globalData.header;
var session_3rd = app.globalData.session_3rd;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeClass: 'type1',
    id:'',
    title:'',
    img:'',
    type:'',
    isText:false,
    isOrg:false,
    newDate:new Date(),
    startDate: "2018-01-01",
    startTime: "00:00",
    endDate: "2018-01-01",
    endTime: "23:59",
    yPrice:0,
    dPrice:0,
    sPrice:0,
    ddPrice:0,
    count:0,
    description: [],
    rule: ["1.点击上方按钮“我要参加”参加活动。", "2.可以让朋友们一起帮忙减价。", "3.奖品份数有限，每个报名者支付后奖品就会减少一份，份数领完则无法继续报名，亲速度哦！","4.完成后，马上联系商家兑奖吧。"],
    org_description:[],
    need_info:["姓名","手机号码"],
    get_time:'2018-09-10',
    get_address:'瞎编一个提交试试',
    get_phone:'18910232146',
    need1:'',
    need2:'',
    need3:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        type:options.type,
        id:options.id
    })
    
  },
  addDesText(){
    this.setData({
      isText:true
    })
  },
  addOrgText() {
    this.setData({
      isOrg: true
    })
  },
  addDesTextF(e){
    var self=this;
    this.setData({
      isText: false,
      description: self.data.description.concat(e.detail.value.textarea)
    })

  },
  addOrgTextF(e) {
    var self = this;
    this.setData({
      isOrg: false,
      org_description: self.data.org_description.concat(e.detail.value.textarea)
    })

  },
  addDesImg(){
    var self = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: api + 'upload_image',
          filePath: tempFilePaths[0],
          header: { "Content-Type": "multipart/form-data" },
          name: 'image',
          formData: {
            session_3rd: encodeURI(session_3rd)
          },
          success: function (res) {
            var image = (JSON.parse(res.data)).data.image
              self.setData({
                description: self.data.description.concat({ src: image })
              })

            
          },
          fail:function(res){
            console.log("addfood fail", res);

          }
        })

      }
    })

  },
  addOrgImg() {
    var self = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: api + 'upload_image',
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            session_3rd: encodeURI(session_3rd)
          },
          success: function (res) {
            var image = (JSON.parse(res.data)).data.image
              self.setData({
                org_description: self.data.org_description.concat({ src: image })
              })


          },
          fail: function (res) {
            console.log("addfood fail", res);

          }
        })

      }
    })

  },
  removeDes(e){
    var self=this;
    self.data.description.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      description: self.data.description
    })
    
  },
  removeOrg(e) {
    var self = this;
    self.data.org_description.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      org_description: self.data.org_description
    })

  },
  yPrice(e){
    this.setData({
      yPrice:e.detail.value
    })

  },
  dPrice(e) {
    this.setData({
      dPrice: e.detail.value
    })

  },
  sPrice(e) {
    this.setData({
      sPrice: e.detail.value
    })

  },
  ddPrice(e) {
    this.setData({
      ddPrice: e.detail.value
    })

  },
  count(e) {
    this.setData({
      count: e.detail.value
    })

  },
  changeTitle(e){
    this.setData({
      title: e.detail.value
    })
  },
  need1(e){
    this.setData({
      need1: e.detail.value
    })
  },
  need2(e) {
    this.setData({
      need2: e.detail.value
    })
  },
  need3(e) {
    this.setData({
      need3: e.detail.value
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
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.id)
    if (this.data.id) {
      this.getDetail(this.data.id);
    }
  
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
  chooseImg:function(){
    var self=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
       
        wx.uploadFile({
          url: api+'upload_image',
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            session_3rd: session_3rd
          },
          success:function(res){
            var image = (JSON.parse(res.data)).data.image
              self.setData({
                img: image
              })
          }
        })




       
      }
    })
  },
  changeStartDate(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  changeStartTime(e){
    this.setData({
      startTime: e.detail.value
    })
  },
  changeEndDate(e){
    this.setData({
      endDate: e.detail.value
    })
  },
  changeEndTime(e){
    this.setData({
      endTime: e.detail.value
    })
  },
  submitMsg(){
    var self = this;
    try {
      wx.showLoading({
        title: '加载中',
      })
    } catch (err) {
      console.log("当前微信版本不支持")
    }
    wx.request({
      url: api + 'save_bargain', //仅为示例，并非真实的接口地址
      data: {
        bargain_id:self.data.id,
        session_3rd: session_3rd,
        title:self.data.title,
        type:self.data.type,
        head_url:self.data.img,
        start_time:self.data.startDate+" "+self.data.startTime,
        end_time:self.data.endDate+" "+self.data.endTime,
        price:self.data.yPrice,
        bargain_price:self.data.dPrice,
        min_every_time:self.data.sPrice,
        max_every_time:self.data.ddPrice,
        goods_num:self.data.count,
        description: JSON.stringify(self.data.description),
        rule: self.data.rule.toString(),
        get_time: self.data.get_time,
        get_address: self.data.get_address,
        get_phone: self.data.get_phone,
        org_description: JSON.stringify(self.data.org_description),
        need_info: (self.data.need_info.concat([self.data.need1, self.data.need2, self.data.need3])).toString()
      },
      method: 'POST',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          
          wx.showToast({
            title: "提交成功",
            icon: 'success',
            duration: 2000


          })
          wx.navigateTo({
            url: '../index/index'
          })
          
        }
      }
    })
  },
  getDetail: function (id) {
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
        bargain_id: id,
        session_3rd: session_3rd
      },
      method: 'GET',
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          self.setData({
            title: res.data.data.title,
            img: res.data.data.head_url,
            type: res.data.data.type,
            yPrice: res.data.data.price,
            dPrice: res.data.data.bargain_price,
            sPrice: res.data.data.min_every_time,
            ddPrice: res.data.data.max_every_time,
            count: res.data.data.goods_num,
            description: JSON.parse(res.data.data.description),
            rule: res.data.data.rule.split(','),
            org_description: JSON.parse(res.data.data.org_description),
            need_info: ["姓名", "手机号码"],
            get_time: res.data.data.get_time,
            get_address: res.data.data.get_address,
            get_phone: res.data.data.get_phone
            
          })
        }
      }
    })
  }
})