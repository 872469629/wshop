// pages/add/add.js
const config = require("../../config.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var productId = options.productId
    var title = options.title
    console.log("productId:", productId)
    this.setData({
      productId: productId,
      title: title
    })
    this.loadProductDetail();
  
  },

  // 商品详情数据获取
  loadProductDetail: function () {
    var that = this;
    wx.request({
      url: config.prodDetail,
      method: 'post',
      data: {
        id: that.data.productId,
        user_id: app.globalData.userInfo.id,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data 
        var status = res.data.ret;
        if (status == 1) {
          var wsProduct = res.data.wsProduct;
          var content = wsProduct.prodContent;
          that.setData({
            wsProdSkuList: res.data.wsProdSkuList
          });
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000,
          });
        }
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
        });
      },
    });
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

  addShopCart: function (e) { //添加到购物车
    var that = this;
    var arrParam = [];
    var item = {};
    item.skuId = that.data.wsProdSkuList[0].id;
    item.quantity = 2;
    item.memberId = app.globalData.userInfo.id;
    arrParam.push(item);
    wx.setStorageSync('wsCartOrder', JSON.stringify(arrParam));
    wx.redirectTo({
      url: '../order/orderconfirm'
    });

  },

})