// pages/settle/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    settleList:[],
    totalPrice:0,
    address:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    const address=wx.getStorageSync("address")||[];
    const checked=wx.getStorageSync("checked")||[];
    const cartList = wx.getStorageSync("cartList") || [];
    let totalPrice=0;
    console.log(totalPrice);
    // console.log(cartList);
    let settleList=[];
    let index;
    let goodsId;
    checked.forEach(v=>{
      goodsId = v;
      index = cartList.findIndex(s => s.goodsId === goodsId);
      settleList.push(cartList[index]); 
      totalPrice += cartList[index].goodsNum * cartList[index].goodsPrice;
    })
    console.log(totalPrice);
    this.setData({
      settleList: settleList,
      totalPrice: totalPrice,
      address: address
    })

    console.log(settleList);
  },

  // checkAddress:function(){
  //   wx.chooseAddress({
  //     success: res => {
  //       console.log(res);
  //       wx.setStorageSync("address", res)
  //       this.setData({
  //         address:res
  //       })
  //     }
  //   })
    
  // },
  
  // toAddress:function(){
  //   wx.navigateTo({
  //     url: '/pages/address/index',
  //   })
  // },
  

  /**
   * 选择收货地址--获取用户授权
   */
  chooseAddress: function () {
    wx.getSetting({
      success: res => {
        const scopeAddress = res.authSetting["scope.address"];
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: req => {
              console.log(req);
              wx.setStorageSync("address", req)
              this.setData({
                address: req
              })
            }
          })
        } else {
          wx.openSetting({
            success: req => {
              wx.chooseAddress({
                success: req1 => {
                  console.log(req1);
                  wx.setStorageSync("address", req1)
                  this.setData({
                    address: req1
                  })
                }
              })
            }
          })
        }
      }
    })

  },

  settleOrder:function(){
    console.log(this.data.address)
    console.log(this.data.settleList)
    wx.request({
      url: 'http://localhost:8080/shop_design_war_exploded/order/create',
      data:{
        sessionid:wx.getStorageSync("sessionId"),
        address:this.data.address,
        settlelist:this.data.settleList,
        orderPrice: this.data.totalPrice
      },
      success:res=>{
        console.log(res);
        wx.navigateTo({
          url: '/pages/pay/index?payImgUrl=' + res.data.payImgUrl,
        })
      }
    })

    console.log("sss")


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