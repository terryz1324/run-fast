// miniprogram/pages/index/index.js
import wxPro from '../../utils/wxPromise.js'

const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarImg: ['../../images/avatar/0.jpg', '../../images/avatar/1.jpg', '../../images/avatar/2.jpg'],
    names: ['张一帅', '代二杆', '崔小胖'],
    inputLabel: ['玩家一', '玩家二', '玩家三'],
    inputValue: '',
    images: [],
  },

  inputName(event){
    const index = event.target.id;
    const name = event.detail.value
    this.data.names[index] = name;
    
  },

  async addAvatar(event){
    let imgName = event.target.id
    console.log(imgName);
    await this.upload(imgName);
    await this.getImg();
    console.log('ce');
    console.log(this.data.images[0].fileID);
    console.log(this.data.avatarImg[imgName]);
    const imagesR = this.data.images.reverse()
    if (this.data.images[imgName]){
      let avatarImgNew = 'avatarImg[' + imgName + ']'; 
      this.setData({
        [avatarImgNew]: imagesR[0].fileID
      })
      
    }
    
  },

  async toStart(){
    this.setData({
      inputValue: ''
    })
    const names = this.data.names;
    const model = JSON.stringify(this.data.names);
    const imgs = JSON.stringify(this.data.avatarImg);
    const toPage = await wxPro.navigateTo({
      url: `../score/score?names=${model}&avatarImg=${imgs}`,
    });
    
  },

  /* 上传图片 */
  async upload(imgName) {
    try {
      const res = await wxPro
        .chooseImage({
          count: 1, // 选择图片的数量,最多 9 张
          sizeType: ['original', 'compressed'], // 以源文件上传或压缩文件上传
          sourceType: ['album', 'camera'],
        })
      const tempFilePaths = res.tempFilePaths;
      console.log(tempFilePaths)
      // let imgSrc = ''
      const res2 = await wx
        .cloud
        .uploadFile({
          cloudPath: 'avatars/' + new Date().getTime() + '.jpg', // 上传文件路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
        })
      console.log(res2.fileID);
      try {
        const res3 = await db
          .collection('avatars')
          .add({
            data: {
              fileID: res2.fileID,
            }
          })
        console.log(res3)
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  },

  /* 
    通过 用户 openid 查询当前用户对应的图片数据
   */
  async getImg() {
    try {
      const res = await wx.cloud.callFunction({
        name: 'login'
      })
      const res2 = await db
        .collection('avatars')
        .where({
          _openid: res.result._openid
        })
        .get()
      console.log(res2);
      this.setData({
        images: res2.data
      })
    } catch (error) {
      console.log(error)
    }
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
    this.data.names = ['张一帅', '代二杆', '崔小胖']
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