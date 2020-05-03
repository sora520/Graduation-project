// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo:[],
    cache:[],
    cartNum:0,
    buttonState:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const cartList = wx.getStorageSync("goodsInfo") || []
    // let index=cartList.findIndex(v=>v.goodsId===this.goodsInfo.goodsId)
    // if(index===-1){
    //   this.goodsInfo.num=1;
    //   cartList.push(this.goodsInfo);
    // }else{
    //   cartList[index].num++;
    //   }

    //   wx.setStorageSync("cartList",cartList)
    this.setData({
      buttonState:wx.getStorageSync("sessionId").length
    })
    console.log(wx.getStorageSync("sessionId").length)



    wx.request({
      url: 'http://localhost:8080/shop_design_war_exploded/goods/detail',
      data: {
        goodsid: options.goodsId
      },
      success: res => {
        console.log(res.data)
        this.setData({
          goodsInfo: res.data
        })
      }
    })

    wx.request({
      url: 'http://localhost:8080/shop_design_war_exploded/cart/cartNum',
      data: {
        sessionid: wx.getStorageSync("sessionId")
      },
      success: res => {
        console.log(res)
        this.setData({
          cartNum: res.data.cartNum
        })
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

  toCart:function(){   
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },

  addCart:function(options){
    // console.log(this.data.goodsInfo.goodsId)
    // this.setData({
    //   cache: wx.getStorageSync("goodsInfo")
    // })
    // this.setData({
    //   cartNum: wx.getStorageSync("searchHistory").length
    // })
    // console.log(wx.getStorageSync("searchHistory").length)
    // var aaa = ""
    // this.setData({ 
    //   cache: [...this.data.cache, ...aaa]
    // })
    // console.log(this.data.cache)
    var that=this
    wx.request({
      url: 'http://localhost:8080/shop_design_war_exploded/cart/addcart',
      data: {
        goodsid: this.data.goodsInfo.goodsId,
        sessionid:wx.getStorageSync("sessionId")
      },
      success: res => {
        console.log(res)
        this.setData({
          cartNum:res.data.cartNum
        })
        wx.showToast({
          title: '加入成功...',
          icon: 'success',
          duration: 1000,
          mask:true
        })
      }
    })

    
    

    wx.setStorageSync("goodsInfo", this.data.goodsInfo)
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