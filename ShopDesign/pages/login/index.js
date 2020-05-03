// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: "",
    UserInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  bindGetUserInfo: function () {
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo)
        wx.showLoading({
          title: '登录中...',
        }),
          // this.setData({
          //   UserInfo: res.userInfo         
          // })
          this.onLogin(),
          wx.hideLoading()  
      }
    })

  },


  onLogin: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'http://localhost:8080/shop_design_war_exploded/user/addUser',
            data: {
              code: res.code
            },
            success: req => {
              console.log(req),
                wx.setStorageSync("sessionId", req.data.sessionId),
                wx.setStorageSync("failureDate", req.data.failureDate)
                wx.setStorageSync("userType", req.data.userType)
                wx.reLaunch({
                url: '/pages/customer_my/index'
              })
              wx.showToast({
                title: '登录成功...',
                icon: 'success',
                duration: 1000
              })
            }, 
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }

    })
  }

})