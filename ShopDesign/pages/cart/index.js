// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    checked: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
    adddress:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    const sessionId=wx.getStorageSync("sessionId");
    if(sessionId.length==0){
      wx.switchTab({
        url: '/pages/customer_my/index',
      })
    }else{
      wx.showLoading({
        title: '正在加载...',
      })
      wx.request({
        url: 'http://localhost:8080/shop_design_war_exploded/cart/cartlist',
        data: {
          sessionid: wx.getStorageSync("sessionId")
        },
        success: res => {
          console.log(res.data)
          this.setData({
            cartList: res.data
          })
          wx.setStorageSync("cartList", res.data)
          wx.hideLoading()
        }
      })
    }
    


  },

  //单选方法
  onChange: function(event) {
    // console.log(event)
    // this.setData({
    //   checked: event.detail
    // })
    // console.log(this.data.checked)
    const checked = event.detail || [];
    this.setCart(checked);

  },
  //
  setCart: function(event) {
    // console.log(event)
    const checked = event || [];
    wx.setStorageSync("checked", checked);
    let goodsId;
    const cartList = wx.getStorageSync("cartList") || [];
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    checked.forEach(v => {
      goodsId = v,
        // console.log(goodsId),
        cartList.forEach(s => {
          // console.log(s.goodsId+goodsId)
          if (s.goodsId == goodsId) {
            totalPrice += s.goodsNum * s.goodsPrice;
            // console.log(s.goodsNum + s.goodsPrice);
            totalNum++;
          }
        })
    })
    
    allChecked = cartList.length != 0 ? allChecked : false;
    if (checked.length != cartList.length) allChecked = false;
    // console.log(allChecked)
    // console.log(totalPrice + totalNum)
    this.setData({
      checked,
      totalPrice,
      totalNum,
      allChecked
    })
  },
  //全选方法
  allChecked: function(event) {
    let allChecked = false;
    const checked = [];
    allChecked = event.detail;
    if (allChecked === true) {
      this.data.cartList.map(item => {
        checked.push(item.goodsId)
      })
    };
    this.setCart(checked)
    // console.log(allChecked);
    // console.log(checked);
    // this.setData({
    //   checked,
    //   allChecked
    // })

    // console.log(this.data.checked)

  },

  //改变商品数量方法
  numEdit: function(event) {
    let goodsNum = event.detail || 1;
    let goodsId = event.currentTarget.dataset.id || "";
    // console.log(goodsNum+goodsId)
    let {cartList,checked}=this.data;
    const index = cartList.findIndex(v => v.goodsId === goodsId);
    cartList[index].goodsNum=goodsNum;
    wx.setStorageSync("cartList",cartList);
    this.setCart(checked);
  },
  
  
  toAddress: function () {
    wx.navigateTo({
      url: '/pages/address/index'
    })
  },

  submitOrder:function(){
    wx.navigateTo({
      url: '/pages/settle/index'
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const sessionId = wx.getStorageSync("sessionId");
    if (sessionId.length == 0) {
      wx.switchTab({
        url: '/pages/customer_my/index',
      })
      wx.showToast({
        title: '请登录...',
        duration: 1000,
        mask: true,
        icon:'none'
      })
    }


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // wx.request({
    //   url: 'http://localhost:8080/shop_design_war_exploded/cart/synccart',
    //   data: {
    //     sessionid: wx.getStorageSync("sessionId"),
    //     cartlist: this.data.cartList
    //   },
    //   success: res => {
    //     console.log("sync");
    //   }
    // })

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})