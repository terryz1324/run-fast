// miniprogram/pages/score/score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    names:[],
    isDisable: false,
  },

  reStart(){
    this.setData({
      isDisable: false,
    })
    wx.showToast({
      title: '新一局开始！',
      icon: 'success',
      duration: 1000
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.names){
      const names = JSON.parse(options.names)
      this.setData({
        names
      })
    }

    
    // console.log(this.data.names[0])

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.scoreInput = this.selectComponent("#scoreInput");
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