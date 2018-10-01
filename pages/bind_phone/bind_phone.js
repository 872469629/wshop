// pages/zc/zc.js
const config = require("../../config.js");
var cookie = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_phone: "",
    countdown: 60,
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

  phonechange: function (e) {
    let _val = e.detail.value
    this.setData({
      user_phone: _val
    })
  },

  getcode: function () {
    var that = this
    var phone = this.data.user_phone;
    if (phone.length != 11) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写11位数手机号码',
      })
      return false;
    }
    wx.request({
      url: config.sendSms,
      method: 'post',
      data: {
        phone: phone
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var data = res.data;
        if (data.ret == 1) {
          cookie = res.header['Set-Cookie']
          wx.showToast({
            title: data.msg,
            duration: 2000
          });
          var self = that;
          self._countdown_run();
          var interval = setInterval(function () {
            var _new = self.data.countdown - 1;
            if (_new < 0) {
              self.setData({
                countdown: 60
              })
              clearInterval(interval)
            } else {
              self._countdown_run();
            }
          }, 1000)
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: data.msg,
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


  },
  //验证码倒计时
  _countdown_run: function (cb) {
    var self = this;
    var _new = self.data.countdown - 1;
    this.setData({
      countdown: _new
    })
  },
  //获取用户输入的验证码
  quoteCode: function (e) {
    let _val = e.detail.value
    this.setData({
      Code: _val
    })
  },
  bindPhone: function () {
    var phone = this.data.user_phone;
    var yzCode = this.data.Code;
    if (phone.length != 11) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写11位数手机号码',
      })
      return false;
    }
    if (yzCode === "") {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '验证码不能为空',
      })
      return false;
    }
    wx.request({
      url: config.bindPhone,
      method: 'post',
      data: {
        phone: phone,
        code: yzCode,
        user_id: "06b7407429424c8b9ed2e43170d2a67d"
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        cookie: cookie
      },
      success: function (res) {
        var data = res.data;
        if (data.ret == 1) {
          wx.showToast({
            title: data.msg,
            duration: 2000
          });

        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: data.msg,
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
})