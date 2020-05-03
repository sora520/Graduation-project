// pages/goods_manage_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    pagesize: 10,
    pagenum: 0,
    searchkey: '',
    total: 0,
    isOver: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.searchkey)
    wx.showLoading({
      title: '正在加载...',
    })
    wx.request({
      url: 'http://localhost:8080/shop_design_war_exploded/goods/search',
      data: {
        pagenum: this.data.pagenum,
        pagesize: this.data.pagesize,
      },
      success: res => {
        console.log(res.data)
        this.setData({
          goodsList: res.data.message,
          total: res.data.total
        })
        wx.hideLoading()
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
    this.data.pagenum += this.data.pagesize
    console.log(this.data.pagenum + "," + this.data.total)
    if (!this.data.isOver) {
      wx.showLoading({
        title: '正在加载...',
      })
      wx: wx.request({
        url: "http://localhost:8080/shop_design_war_exploded/goods/search",
        data: {
          searchkey: this.data.searchkey || "",
          pagenum: this.data.pagenum,
          pagesize: this.data.pagesize,
        },
        success: res => {
          console.log(res.data)
          this.setData({
            goodsList: [...this.data.goodsList, ...res.data.message]
          })

          if (this.data.goodsList.length == this.data.total) {
            this.setData({
              isOver: true
            })
          }
          wx.hideLoading()
        }
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})