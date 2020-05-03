// pages/express/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expressList:[],
    expCode:"",
    expNo:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let expCode=options.expCode;
    let expNo = options.expNo;
    // console.log(options)
    
    wx.request({
      url: 'http://localhost:8080/shop_design_war_exploded/order/express',
      data:{
        expCode: expCode,
        expNo: expNo
      },
      success: req => {
        // console.log(req)
        // let expCode = req.data.ShipperCode;
        switch (expCode){
          case "STO":expCode="申通快递";break;
          case "YTO": expCode = "圆通快递"; break;
          case "ZTO": expCode = "中通快递"; break;
        }
        this.setData({
          expressList: req.data.Traces.reverse(),
          expNo: req.data.LogisticCode,
          expCode: expCode
        })
        wx.setStorageSync("expressList", req.data.Traces.reverse())
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