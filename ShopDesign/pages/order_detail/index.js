// pages/order_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:[],
    goodsInfo:[],
    address:[],
    _options:'',
    state:'',
    showCancel: false,
    showConfirm: false,
    orderStateId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderId = options.orderId;
    console.log(options);
    wx.request({
      url: 'http://localhost:8080/shop_design_war_exploded/order/detail',
      data: {
        orderId: orderId
      },
      success: res => {
        console.log(res)
        this.setData({
          orderInfo: res.data,
          address: res.data.addressJson,
          goodsInfo: res.data.goodsInfoJson,
          state: this.setState(res.data.orderState),
          _options: options
        })
      }
    })
    
  },

  setState:function(orderState){
    let state;
    switch (orderState) {
      case "0": state = "订单待付款"; break;
      case "1": state = "卖家待发货"; break;
      case "2": state = "卖家已发货"; break;
      case "3": state = "订单已完成"; break;
      case "9": state = "订单已取消"; break;
    }
    return state;
  },

  /**
   * 跳转快递信息页面
   */
  toExpress: function (event) {
    let expCode = event.currentTarget.dataset.name;
    let expNo = event.currentTarget.dataset.id;
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/express/index?expCode=' + expCode + '&expNo=' + expNo
    })
  },

  openPopup: function (event) {
    console.log(event)
    let show = event.currentTarget.dataset.name;
    let showCancel = false;
    let showConfirm = false;
    if (show == "showCancel") {
      showCancel = true;
    } else if (show == "showConfirm") {
      showConfirm = true;
    }
    this.setData({
      showCancel: showCancel,
      showConfirm: showConfirm,
      orderStateId: event.currentTarget.dataset.id
    })
  },

  closePopup: function () {
    this.setData({
      showCancel: false,
      showConfirm: false,
      orderStateId: ''
    })
  },

  updateState: function (orderId, url) {
    wx.request({
      url: url,
      data: {
        orderId: orderId
      },
      success: res => {
        console.log(res.data)
        if (res.data == 'success') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })
        } else {
          wx.showToast({
            title: '失败',
            icon: 'fail',
            duration: 1000,
            mask: true
          })
        }
        this.closePopup();
        console.log("closePopup执行")
        let orderId = this.data._options;
        this.onLoad(this.data._options);
        console.log("onLoad执行")
        
      }
    })

  },

  cancelOrder: function () {
    let orderId = this.data.orderStateId;
    let url = 'http://localhost:8080/shop_design_war_exploded/order/cancel';
    console.log(orderId)
    this.updateState(orderId, url);
  },

  confirmOrder: function () {
    let orderId = this.data.orderStateId;
    let url = 'http://localhost:8080/shop_design_war_exploded/order/confirm';
    console.log(orderId)
    this.updateState(orderId, url);
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