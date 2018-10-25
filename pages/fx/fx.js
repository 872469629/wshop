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
    
  },
  onShow: function () {
    var that = this;
      //获取最新用户信息
      wx.login({
        success: function (res) {
          var code = res.code;
          wx.request({
            url: config.getWcxUser,
            method: 'post',
            data: {
              code: code
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              var data = res.data;
              app.globalData.userInfo = data.userInfo;
              if (app.globalData.userInfo && app.globalData.userInfo.isAgent && app.globalData.userInfo.isAgent == '1') {
                that.setData({
                  member: app.globalData.userInfo
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '您还不是代理商会员，立刻购物',
                  showCancel: false,
                  success: function (res) {
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  }
                })
              }
            },
            fail: function (e) {
              wx.showToast({
                title: '网络异常！err:getsessionkeys',
                duration: 2000
              });
            },
          });
        }
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
  inputAmount:function(e){
    var txAmount = e.detail.value
    this.setData({
      txAmount: txAmount
    })
  },
  qdtx:function(){
    var that = this
    var txAmount = that.data.txAmount
    var balance = that.data.member.balance
    if (txAmount>balance){
      wx.showModal({
        title: '提示',
        content: '输入金额不能超过最大金额',
        showCancel: false,
        success: function (res) {

        }
      })
      return;
    }

    wx.request({
      url: config.tx,
      method: 'post',
      data: { userId: app.globalData.userInfo.id, amount: txAmount },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if(res.data.ret=='1'){
          wx.showToast({
            title: '提现提交成功！',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
            that.setData({
              member: res.data.member
            })
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {

            }
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