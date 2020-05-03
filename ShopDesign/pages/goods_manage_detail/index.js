// pages/goods_manage_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    goodsInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.request({
      url: 'http://localhost:8080/shop_design_war_exploded/goods/detail',
      data: {
        goodsid: options.goodsId
      },
      success: res => {
        console.log(res.data)
        this.setData({
          swiperList: res.data.goodsImgSrcJson,
          goodsInfo: res.data
        })
      }
    })
  },

  afterRead:function(event) {
    console.log(event)
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    let time=Date.parse(new Date());
    let goodsId=this.data.goodsInfo.goodsId;
    let swiperList=this.data.swiperList;
    
    // let 
    let fileType = file.path.substring(file.path.lastIndexOf(".") + 1);
    let url = "http://localhost:8080/shop_design_war_exploded/img/goods/" + time + "."+fileType;
    swiperList.push({ name: time, url: url })
    let swiper = JSON.stringify(swiperList);
    // console.log(file.filePath)
    console.log(file.path)
    console.log(fileType)
    console.log(swiper)
    


    wx.uploadFile({
      url: 'http://localhost:8080/shop_design_war_exploded/goods/update', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: {
        time: time,
        goodsId: goodsId,
        fileType:fileType,
        swiperList: swiper
        },
      success(res) {
        console.log(res)
        // 上传完成需要更新 fileList
        // const { swiperList = [] } = this.data;
        // swiperList.push({ ...file, url: res.data });
        // this.setData({ swiperList });
      }
    });
  },
  deleteSwiper:function(event){
    let swiperList=this.data.swiperList;
    console.log(event.detail.index)
    console.log(swiperList[event.detail.index])
    
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