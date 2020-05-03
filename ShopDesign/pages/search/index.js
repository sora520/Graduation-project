// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchkey: '',
    searchHistory: []
  },

  /**
   * 输入框状态更改事件
   */
  onChange: function(event) {
    this.setData({
      searchkey: event.detail
    })
    // console.log(this.data.searchkey)
  },

   /**
   * 点击搜索按钮事件
   */
  onClick: function() {
    console.log(this.data.searchkey)
    // wx.request({
    //   url: 'http://localhost:8080/shop_design_war_exploded/goods/search/' + this.data.searchkey,
    //   success: res => {
    //     console.log(res.data)
    //     this.setData({
    //       goodsList: res.data
    //     })

    //   }
    // })
    // this.setData({
    //   searchHistory: [...wx.getStorageSync("searchHistory"),...this.data.searchkey]
    // })
    // console.log(this.data.searchHistory)
    // wx.setStorageSync("searchHistory", this.data.searchHistory)
    this.setSearch();
  },

  /**
   * 点击键盘搜索事件
   */
  onSearch: function() {
    this.setSearch();
  },

  /**
   * 搜索事件
   */
  setSearch: function() {
    let searchHistory = wx.getStorageSync("searchHistory");
    let searchkey = this.data.searchkey;
    console.log(searchkey)
    if (searchkey.length == 0 && searchkey == "") {
      wx.showToast({
        title: '输入内容为空',
        icon: "success",
        duration: 1000,
        mask: true
      })
    } else if (searchkey.length > 15) {
      wx.showToast({
        title: '输入内容过长',
        icon: "success",
        duration: 1000,
        mask: true
      })
    } else {
      searchHistory.push(searchkey);
      if (searchHistory.length > 10) searchHistory.shift();
      wx.setStorageSync("searchHistory", searchHistory);
      this.setData({
        searchHistory: searchHistory
      });
      wx.navigateTo({
        url: '/pages/goods_list/index?searchkey=' + this.data.searchkey,
      })
      
    }
  },

   /**
   * 点击搜索历史事件
   */
  onHistory:function(event){
    // console.log(event.currentTarget.id)
    wx.navigateTo({
      url: '/pages/goods_list/index?searchkey=' + event.currentTarget.id,
    })
  },


   /**
   * 删除搜索历史
   */
  delHistory:function(){
    let searchHistory=[];
    wx.setStorageSync("searchHistory", searchHistory);
    this.setData({
      searchHistory: searchHistory
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {    
    this.setData({
      searchHistory: wx.getStorageSync("searchHistory")
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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