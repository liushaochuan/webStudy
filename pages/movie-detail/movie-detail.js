// pages/movie-detail/movie-detail.js
import {httpGet} from "../../utils/request"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {}
  },
  processData(data) {
    const movie = data.data;
    // movie.title = movie.title.split(' ')[0]
    this.setData({
      data: movie
    })
  },
  getMovieDetail(data) {
    const url = app.globalData.baseUrl + "/v2/movie/subject/" + data.movieId;
    httpGet(url, this.processData)
  },
  gotoSearch(event) {
    const name = event.currentTarget.dataset.name
    wx.switchTab({
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovieDetail(options)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: that.data.title,
      fail(error) {
        console.log(error)
      }
    })
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