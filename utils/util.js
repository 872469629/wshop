const config = require("../config.js");
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  toBeFromUser: toBeFromUser
  
}

function checkStringEmpty(data){
  if(null == data || "" == data){
    return false;
  }
  return true;
}
function toBeFromUser(userId,fromUserId){
  wx.request({
    url: config.toBeFromUser,
    method: 'post',
    data: { userId: userId, fromUserId: fromUserId },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {

    },
    fail: function (e) {
      wx.showToast({
        title: '网络异常！',
        duration: 2000
      });
    },
  })
}