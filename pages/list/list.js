const config = require("../../config.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catId: 0,
    wsProductList: [],
    active: 'dateDesc'
  },
  GoAdd(){
    wx.navigateTo({
      url: '../add/add',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var title = options.title;
    var catId = options.catId;
    var that = this;
    //更改头部标题
    wx.setNavigationBarTitle({
      title: title,
      success: function () {
      },
    });

    that.setData({
      catId: catId,
    })
    this.getProds();
  },
  getProds:function(){
    var that = this
    //ajax请求数据
    wx.request({
      url: config.getProdListByCat,
      method: 'post',
      data: {
        user_id: app.globalData.userInfo.id,
        prodOrderBy: this.data.active,
        prodCategoryId: this.data.catId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          wsProductList: res.data.wsProductList
        })
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //详情页跳转
  lookdetail: function (e) {
    console.log(e)
    var lookid = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: "../index/detail?id=" + lookid.id
    })
  },
  switchSlider: function (e) {
    this.setData({
      current: e.target.dataset.index
    })
  },
  changeSlider: function (e) {
    this.setData({
      current: e.detail.current
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