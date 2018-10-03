// pages/home/home.js
const config = require("../../config.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    productData: [],
    proCat: [],
    page: 2,
    index: 2,
    brand: [],
    imgUrl: [],
    active: 'dateDesc'
  },
  onLoad: function (options) {
    var that = this;
    app.getUserInfo(function () {
      that.init();
    });
    var fromUserId = options.fromUserId    
    if (fromUserId){
      app.globalData.fromUserId = fromUserId
      //如果我在登录中就要成为该用户的下限
      app.getUserInfo(function () {
        if (app.globalData.userInfo && app.globalData.userInfo.id) {
          app.util.toBeFromUser(app.globalData.userInfo.id, fromUserId)
        }
      });
      
    }
  },
  init: function () {
    var that = this
    wx.request({
      url: config.index,
      method: 'post',
      data: { user_id: app.globalData.userInfo.id, orderType: this.data.active },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var productdata = res.data.wsProductList;
        var imgurls = res.data.adBannerList;
        that.setData({
          imgUrls: imgurls,
          productData: productdata
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
  },
  init: function () {
    var that = this
    wx.request({
      url: config.index,
      method: 'post',
      data: { user_id: app.globalData.userInfo.id, orderType: this.data.active },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var productdata = res.data.wsProductList;
        var imgurls = res.data.adBannerList;
        that.setData({
          imgUrls: imgurls,
          productData: productdata
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
  },
  getProds: function () {
    var that = this
    that.setData({
      productData: []
    });
    wx.request({
      url: config.indexProds,
      method: 'post',
      data: { orderType: this.data.active },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var productdata = res.data.wsProductList;
        that.setData({
          productData: productdata
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
  },

  onShareAppMessage: function () {
    var userId = app.globalData.userInfo.id
    var path = '/pages/home/home'
    if(userId){
      path += '?fromUserId=' + userId
    }
    return {
      title: config.shareTitle,
      path: path,
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  GoList() {
    wx.navigateTo({
      url: '../list/list',
    })
  },
  /*
  GoAdd(){
    wx.navigateTo({
      url: '../add/add',
    })
  },
  */
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

  screen: function (e) {

    var that = this
    var cur = e.currentTarget.dataset.cur;
    console.log("screen" + cur)
    var active = that.data.active;
    if (cur == 'dateDesc') {
      if (active == 'dateDesc') {
        active = 'dateAsc'
      } else if (active == 'dateAsc') {
        active = 'dateDesc'
      } else {
        active = 'dateDesc'
      }
    } else if (cur == 'salesDesc') {
      if (active == 'salesDesc') {
        active = 'salesAsc'
      } else if (active == 'salesAsc') {
        active = 'salesDesc'
      } else {
        active = 'salesDesc'
      }
    } else if (cur == 'priceDesc') {
      if (active == 'priceDesc') {
        active = 'priceAsc'
      } else if (active == 'priceAsc') {
        active = 'priceDesc'
      } else {
        active = 'priceDesc'
      }
    }
    console.log(active)
    that.setData({
      active: active
    })

    that.getProds()
  },
})