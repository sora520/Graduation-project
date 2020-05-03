//index.js
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testdata:"",
    swiperList:[],
    recommendList:[]
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://localhost:8080/shop_design_war_exploded/index/swiperdata',
      success:res=>{
        console.log(res.data)
        this.setData({
          swiperList: res.data
        })
      }
    })

    wx.request({
      url: 'http://localhost:8080/shop_design_war_exploded/index/recommend',
      success: res => {
        console.log(res.data)
        this.setData({
          recommendList: res.data
        })
      }
    })

  },

  onClick: function () {
    console.log("聚焦"),
      wx.navigateTo({
        url: '../search/index',
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