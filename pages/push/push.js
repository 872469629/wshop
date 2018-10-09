// pages/bonus/bonus.js
const config = require("../../config.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    amount: '0.00',
    commissions: []
  },
  qh(e) {
    var active = e.currentTarget.dataset.active
    if (active != this.data.active) {
      this.setData({
        active: active,
        commissions: []
      })
      this.getBouns()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.getUserInfo(function () {
      that.getBouns()
      wx.request({
        url: config.myGroupTotalAmount,
        method: 'post',
        data: { userId: app.globalData.userInfo.id},
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {

          if (res.data.ret == '1') {
            that.setData({
              amount: res.data.totalAmount
            })
          }
        },
        fail: function (e) {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        },
      })
    });
  },

  getBouns: function () {
    var that = this
    wx.request({
      url: config.myConsumeBouns,
      method: 'post',
      data: { userId: app.globalData.userInfo.id, level: that.data.active, type: "1" },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          commissions: []
        });
        var list = res.data.list;
        var commissions = that.data.commissions
        if (list) {
          for (var i = 0; i < list.length; i++) {
            commissions.push(list[i])
          }
        }
        that.setData({
          commissions: commissions
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})