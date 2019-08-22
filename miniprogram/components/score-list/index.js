// components/score-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: String,
    totalScore: Number,
    score: Array,
    inputValue: String,
    isDisabled: Boolean,
    score1: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    // totalScore: 0,
    score: [0, 0, 0],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDisabled(){
      const score2 = wx.getStorageSync('score2');
      if (score2){
        this.setData({
          isDisabled: true
        })
      } 
    },
    booom(){
      const scoreNew = 10;
      this._toScore(scoreNew)
    },
    inputScore(event){
      let scoreNew = parseInt(event.detail.value);
      this._toScore(scoreNew);
      
    },
    _toScore(scoreNew){
      const isType = type => obj => Object.prototype.toString.call(obj).match(/\[object ([a-zA-Z]*)\]/)[1] === type;
      if (isType('Number')(scoreNew) && scoreNew >= 0) {
        const score1 = wx.getStorageSync('score1');
        if (score1) {
          wx.setStorageSync('score2', scoreNew)
        }
        else {
          wx.setStorageSync('score1', scoreNew)

        }
        scoreNew = -scoreNew;

        let totalScoreNew = this.data.totalScore + scoreNew;
        this.setData({
          score: this.data.score.concat(scoreNew),
          inputValue: '',
          totalScore: totalScoreNew,
          isDisabled: true,
        })
      } else {
        wx.showToast({
          title: '请确认您输入的是正确的数字！',
          icon: 'none',
          duration: 1000
        })
      }
    },
    toAdd(){
      const score1 = wx.getStorageSync('score1');
      const score2 = wx.getStorageSync('score2');
      if (score2){
        let score3 = score1 + score2;
        let totalScoreNew = this.data.totalScore + score3;
        this.setData({
          score: this.data.score.concat(score3),
          inputValue: '',
          totalScore: totalScoreNew,
          
        })
        wx.removeStorageSync('score1')
        wx.removeStorageSync('score2')
      }
    },
  }
})
