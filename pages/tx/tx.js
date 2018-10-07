// pages/tx/tx.js
const config = require("../../config.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: -1,
    withdrawalList:[]
  },
  qh(e) {
    var active = e.currentTarget.dataset.active
    if (active != this.data.active) {
      this.setData({
        active: active,
        withdrawalList: []
      })
      this.getWithdrawal()
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.getUserInfo(function () {
      that.getWithdrawal()
    });
  },
  getWithdrawal:function(){
    var that = this
    wx.request({
      url: config.withdrawalList,
      method: 'get',
      data: { userId: app.globalData.userInfo.id, status: that.data.active },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          withdrawalList: []
        });
        var member = res.data.member;
        var list = res.data.list;
        var withdrawalList = that.data.withdrawalList
        if (list) {
          for (var i = 0; i < list.length; i++) {
            withdrawalList.push(list[i])
          }
        }
        that.setData({
          withdrawalList: withdrawalList
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