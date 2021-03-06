/**
 * 小程序配置文件
 */
// var host = "http://w.51wdxh.com/wx"
// var host = "http://127.0.0.1:9090/wshop/wx"
var host = "http://w2.51wdxh.com/wx"

var config = {

  //分享标题
  shareTitle: "wshop微信商城",
  // 下面的地址配合云端 Server 工作
  host,

  //获取用户信息
  getWcxUser: host + '/usercenter/getWcxUser',

  //获取首页信息
  index: host + '/index',

  //分类页面接口
  prodCatIndex: host + '/prodCat/index',
  //商品详情接口
  prodDetail: host + '/prod/getProdDetail',
  //根据分类查询商品列表接口
  getProdListByCat: host + '/prod/getProdListByCat',
  //根据品牌查询商品列表接口
  getProdListByBrand: host + '/prod/getProdListByBrand',
  //购物车查询
  cart: host + '/cart',
  //添加购物车
  addCart: host + '/cart/addCart',
  //删除购物车
  deleteCart: host + '/cart/deleteCart',
  //订单
  order: host + '/order/wcxindex',
  //订单列表
  orderlist: host + '/order/list',
  //取消订单
  ordercancel: host + '/order/cancelOrder',
  //确认收货
  orderRecevied: host + '/order/orderRecevied',
  //付款
  pay: host + '/pay/wcxindex',
  //付款
  payByOrderId: host + '/pay/payByOrderId',
  //退款
  returnBack: host + '/returnBack',
  //添加收藏
  addCollect: host + '/collect/addCollect',
  //优惠卷
  coupon: host + '/coupon',
  //个人中心
  userindex: host + '/usercenter/index',
  //关于我们
  about: host + '/usercenter/about',
  //地址
  addresslist: host + '/address/list',
  //地址详情
  addressdetail: host + '/address/detail',
  //保存用户地址
  addresssave: host + '/address/save',
  //删除用户地址
  addressdel: host + '/address/delete',
  //查询地市
  findCityList: host + '/address/findCityList',
  //删除用户地址
  addressdelete: host + '/address/delete',
  //保存用户默认地址
  addresssavedefault: host + '/address/saveDefaultAddr',
  //保存用户授权后的信息
  saveWcxUser: host + '/usercenter/saveWcxUser',
  //用户收藏
  userCollect: host + '/usercenter/userCollect',
  //用户取消收藏
  cancelCollect: host + '/collect/cancelCollect',
  //短信发送
  sendSms: host + '/usercenter/sendSms',
  //绑定手机号
  bindPhone: host + '/usercenter/bindPhone',
  //获取首页商品
  indexProds: host + '/index/prods',
  //成为分享者的下限
  toBeFromUser: host + '/commission/toBeFromUser',
  //购物车总额
  cartAmount: host + '/cart/cartAmount',
  //我的团队
  myGroup: host + '/commission/myGroup',
  //消费奖金
  myConsumeBouns: host + '/commission/myConsumeBouns',
  //提现
  tx: host + '/withdrawal/tx',
  //提现记录列表
  withdrawalList: host + '/withdrawal/withdrawalList',
  // 分销订单
  commissionOrders: host + '/commission/commissionOrders',
  //我的团队的总金额
  myGroupTotalAmount: host + '/commission/myGroupTotalAmount',
  
  
};

module.exports = config
