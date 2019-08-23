// miniprogram/pages/score/score.js
import { isType } from '../../utils/command.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarImg: [],
    // avatarImg: ['../../images/avatar/0.jpg', '../../images/avatar/1.jpg', '../../images/avatar/2.jpg',],
    names: ['张一帅', '代二杆', '崔小胖'],
    bgColor: ['#f3c8c8', '#f2eea8', '#a8dcf2'],
    totalScores: [0, 0, 0],
    scores: [[], [], []],
    _scores: [[], [], []],
    scoreAdd: [],
    scoreIndex: [0, 1, 2],
    isDisabled: [false, false, false],
    tempLock: [],
    inputValue: '',
  },

  /* 下一局 */
  reStart(){
    this.setData({
      isDisabled: [false, false, false],
    })
    wx.showToast({
      title: '新一局开始！',
      icon: 'success',
      duration: 800
    })
  },

  /* 输入分数 */
  inputScore(event){
    // 获取分数数值并转成 int 类型
    let scoreNew = parseInt(event.detail.value);
    // 获取输入 id
    const index = event.target.id;
    
    switch (index) {
      case '0':
        this._haveScore(scoreNew, 0);
        break;
      case '1':
        this._haveScore(scoreNew, 1);
        break;
      case '2':
        this._haveScore(scoreNew, 2);
        break;
      default:
        return
    } 
  },

  /* 输入框锁定 */
  lockOther(event){
    // 获取分数数值并转成 int 类型
    let scoreNew = parseInt(event.detail.value);
    // 获取输入 id
    const index = event.target.id;
    this.data.tempLock = this.data.isDisabled
    switch (index) {
      case '0':
        this.setData({
          isDisabled: [false, true, true]
        })
        break;
      case '1':
        this.setData({
          isDisabled: [true, false, true]
        })
        break;
      case '2':
        this.setData({
          isDisabled: [true, true, false]
        })
        break;
      default:
        return
    } 
  },

  /* 数据赋值 */
  _haveScore(scoreNew, index){
    // 验证数据类型
    if (isType('Number')(scoreNew) && scoreNew >= 0){
      let tempLockN = this.data.tempLock
      this.setData({
        isDisabled: tempLockN
      })
      // 获取应该减去的分数
      let scoreMinus = -scoreNew;
      // 总分加上本场得分获取最后总分
      let totalScoreNew = this.data.totalScores[index] + scoreMinus;

      let score = 'scores[' + index + ']';  
      let totalScoresNew = 'totalScores[' + index + ']';
      let isDisabledNew = 'isDisabled[' + index + ']';

      // 缓存现实比分数据
      this.data._scores[index] = this.data._scores[index].concat(scoreMinus)
      // 倒序数组，反向展示 text 文本
      let scoreReverse = this.data._scores[index]
      scoreReverse = scoreReverse.reverse();

      this.setData({
        [score]: scoreReverse,
        inputValue: '',
        [totalScoresNew]: totalScoreNew,
        [isDisabledNew]: true,
      });
      // 第一次输入
      if (this.data.scoreAdd.length < 1){
        // 临时数组添加第一次输入数值
        this.data.scoreAdd.push(scoreNew);
        // 根据下标删除指定位置元素
        this._removeArray(index);
      }
      // 第二次输入
      else if (this.data.scoreAdd.length == 1){
        // 根据下标删除指定位置元素
        this._removeArray(index);
        // 获取两次比分之和，用于为第三人赋值
        let scoreToAdd = this.data.scoreAdd[0] + scoreNew;
        // 获取第三人 id 
        const lastIndex = this.data.scoreIndex[0];
        // 禁用第三人 输入框
        let isDisabledNew = 'isDisabled[' + lastIndex + ']';
        // 更新第三人总分
        let totalScoreNew = this.data.totalScores[lastIndex] + scoreToAdd;

        let score = 'scores[' + lastIndex + ']';
        let totalScoresNew = 'totalScores[' + lastIndex + ']';
        // 倒序数组，反向展示 text 文本
        this.data._scores[lastIndex] = this.data._scores[lastIndex].concat(scoreToAdd)
        let scoreReverse = this.data._scores[lastIndex]
        scoreReverse = scoreReverse.reverse();

        this.setData({
          [score]: scoreReverse,
          [totalScoresNew]: totalScoreNew,
          [isDisabledNew]: true,
        });
        // 重置临时数组
        this.data.scoreAdd = [];
        this.data.scoreIndex = [0, 1, 2];
        
        wx.setStorageSync('totalScores', this.data.totalScores)
      }
    }else{
      let tempLockN = this.data.tempLock
      this.setData({
        isDisabled: tempLockN
      })
      wx.showToast({
        title: '请确认您输入的是正确的数字！',
        icon: 'none',
        duration: 500
      })
    }
  },

  /* 根据下标删除指定位置元素 */
  _removeArray(index){
    Array.prototype.remove = function (val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
    this.data.scoreIndex.remove(index)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户输入姓名信息
    if (options.names){
      const names = JSON.parse(options.names)
      const avatarImg = JSON.parse(options.avatarImg)
      this.setData({
        names,
        avatarImg
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