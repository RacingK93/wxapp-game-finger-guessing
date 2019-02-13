//index.js
//获取应用实例
let timer;
let numAi = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnState:false,
    gameResult:'',
    winNum:0,
    imageAiScr:'',
    imageUserScr:'/pages/images/what.png',
    srcs:[
      '/pages/images/shitou.png',
      '/pages/images/jiandao.png',
      '/pages/images/bu.png'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let oldWinNum = wx.getStorageSync('winNum')
    if(oldWinNum != null && oldWinNum != ''){
      this.setData({winNum:oldWinNum})
    }
    this.timerGo();
  },
  changeForChoose(e){
    if(this.data.btnState){
      return;
    }

    this.setData({ imageUserScr:this.data.srcs[e.currentTarget.id]})
    clearInterval(timer)

    let user = this.data.imageUserScr;
    let ai = this.data.imageAiScr;
    let num = this.data.winNum;
    let str = '你输了';

    if (user == '/pages/images/shitou.png' && ai == '/pages/images/jiandao.png'){
      num++;
      str = '你赢了！';
      wx.setStorageSync('winNum', num)
    }
    if (user == '/pages/images/bu.png' && ai == '/pages/images/shitou.png') {
      num++;
      str = '你赢了！';
      wx.setStorageSync('winNum', num)
    }
    if (user == '/pages/images/jiaodao.png' && ai == '/pages/images/bu.png') {
      num++;
      str = '你赢了！';
      wx.setStorageSync('winNum', num)
    }
    if(user == ai){
      str = '平局';
    }
    this.setData({
      winNum:num,
      gameResult:str,
      btnState:true
    })
  },
  timerGo(){
    timer = setInterval(this.move,100)
  },
  move(){
    if (numAi >= 3) {
      numAi = 0;
    }
    this.setData({ imageAiScr: this.data.srcs[numAi] })
    numAi++;
  },
  again(){
    if(!this.data.btnState){
      return;
    }
    this.timerGo();
    this.setData({
      btnState:false,
      gameResult:'',
      imageUserScr:'/pages/images/what.png'
    })
  }
})
