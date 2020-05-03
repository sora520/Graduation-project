// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    active: 0,
    tabList: ["全部订单","待付款","待发货", "待收货"],
    showCancel:false,
    showConfirm: false,
    showSend:false,
    orderStateId:'',
    userType:'',
    expCode:'',
    expNo:'',
    orderId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const url ="http://localhost:8080/shop_design_war_exploded/order/all";
    const state=-1;
    this.sendRequest(url, state);
    // wx.request({
    //   url: 'http://localhost:8080/shop_design_war_exploded/order/getall',
    //   data: {
    //     sessionid: wx.getStorageSync("sessionId"),
    //   },
    //   success: res => {
    //     console.log(res)
    //     this.setData({
    //       orderList: res.data
    //     })
    //   }
    // })
  },

  sendRequest:function(url,state){
    console.log(url+state)
    wx.request({
      url: url,
      data: {
        sessionid: wx.getStorageSync("sessionId"),
        state: state
      },
      success: res => {
        console.log(res)
        this.setData({
          orderList: res.data,
          userType:wx.getStorageSync("userType")
        })
      }
    })
  },


  /**
   * 顶部导航跳转
   */
  onTab:function(event){
    const url = "http://localhost:8080/shop_design_war_exploded/order/all";
    let state = event.detail.index-1;
    console.log(state)
    this.sendRequest(url, state);
  },

  /**
   * 跳转订单详情页面
   */
  toDetail:function(event){
    console.log(event)
    wx.navigateTo({
      url: '/pages/order_detail/index?orderId=' + event.orderId
    })
  },


  /**
   * 跳转快递信息页面
   */
  toExpress: function (event){
    let expCode = event.currentTarget.dataset.name;
    let expNo = event.currentTarget.dataset.id;
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/express/index?expCode='+expCode+'&expNo='+expNo
    })
  },
  /**
   * 跳转订单详情页面
   */
  toDetail: function (event){
    // console.log(event)
    let orderId=event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order_detail/index?orderId=' + orderId
    })
  },
  /**
   * 打开弹窗--取消订单，确认收货，发货
   */
  openPopup: function (event) {
    console.log(event)
    let show = event.currentTarget.dataset.name;
    let showCancel=false;
    let showConfirm = false;
    if(show=="showCancel"){
      showCancel=true;
    } else if (show == "showConfirm"){
      showConfirm=true;
    } else if (show =="showSend"){
      showSend = true;
    }
    this.setData({
      showCancel: showCancel,
      showConfirm: showConfirm,
      showSend:showSend,
      orderStateId: event.currentTarget.dataset.id||""
    })
  },
  /**
   * 关闭弹窗--取消订单，确认收货
   */
  closePopup: function () {
    this.setData({
      showCancel: false,
      showConfirm: false,
      orderStateId:''
    })
  },

  /**
   * 发送请求，更新订单状态
   * 取消订单，确认收货
   */
  updateState:function(orderId,url){
    wx.request({
      url: url,
      data: {
        orderId: orderId
      },
      success: res => {
        console.log(res.data)
        if (res.data == "success") {
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
      }
    })
    
  },
   /**
   * 取消订单
   */
  cancelOrder: function (){
    let orderId = this.data.orderStateId;
    let url = 'http://localhost:8080/shop_design_war_exploded/order/cancel';
    console.log(orderId)
    this.updateState(orderId, url);
  },

   /**
   * 确认收货
   */
  confirmOrder: function () {
    let orderId = this.data.orderStateId;
    let url = 'http://localhost:8080/shop_design_war_exploded/order/confirm';
    console.log(orderId)
    this.updateState(orderId, url);
  },

  /**
   * 跳转付款页面
   */
  toPay:function(event){
    console.log(event)

  },

  /**
   * 监听发货提示窗--识别码输入框
   */
  codeChange:function(event){
    // console.log(event.detail)
    this.setData({
      expCode: event.detail
    })
  },
  /**
   * 监听发货提示窗--单号输入框
   */
  noChange: function (event) {
    // console.log(event)
    this.setData({
      expNo: event.detail
    })
  },
  /**
   * 快递发货
   */
  sendExpress:function(){
    wx.request({
      url: 'http://localhost:8080/shop_design_war_exploded/order/send',
      data: {
        expCode:this.data.expCode,
        expNo: this.data.expNo,
        orderId: this.data.orderStateId
      },
      success: res => {
        console.log(res)
        // this.setData({
        //   goodsInfo: res.data
        // })
        if (res.data == "success") {
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
      }
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