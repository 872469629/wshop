const config = require("../../config.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenName:true,
    flag: false,
    member:''
  },
  onLoad: function () {
    var that = this;
    app.getUserInfo(function(){
      that.setData({
        member: app.globalData.userInfo
      })
    });
  },
  Txian: function (e) {
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  out:function(){
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  qdtx:function(){
    wx.showToast({
      title: '提现提交成功！',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  GoFxd: function () {
    wx.navigateTo({
      url: '../fxdd/fxdd',
    })
  },
  GoTeam(){
    wx.navigateTo({
      url: '../team/team',
    })
  },
  GoHhr(){
    wx.navigateTo({
      url: '../hhr/hhr',
    })
  },
  GoBonus() {
    wx.navigateTo({
      url: '../bonus/bonus',
    })
  },
  GoPush() {
    wx.navigateTo({
      url: '../push/push',
    })
  },
  GoTx(){
    wx.navigateTo({
      url: '../tx/tx',
    })
  }

 
})