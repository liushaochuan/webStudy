// pages/more-movies/more-movies.js
import {gotoMovieDetail} from "../../utils/page"
import {httpGet} from "../../utils/request"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: [],
    title: ''
  },
  // 数据处理
  processData(data) {
    wx.hideNavigationBarLoading()
    const movies = this.data.movieList;
    data.data.subjects.forEach(movie => {
      var title = movie.title.length >= 6 ? movie.title.substring(0, 6) + '...' : movie.title
      movies.push({
        title,
        coverUrl: movie.images.large,
        movieId: movie.id,
        rating: movie.rating
      })
    });
    this.setData({
        movieList: movies,
        ["urlAndParam.parameter.start"]: movies.length
    })
  },
  getMovieListData(data) {
    wx.showNavigationBarLoading()
    let parameter = [];
    for (var key in data.parameter) {
      parameter.push(key + '=' + data.parameter[key]);
    }
    parameter = parameter.join('&')
    const url = app.globalData.baseUrl + data.url + "?" + parameter;
    httpGet(url, this.processData)
  },
  onScrollLower(event) {
    this.getMovieListData(this.data.urlAndParam)
  },
  gotoMovieDetail,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const urlAndParam = {
      url: options.url,
      parameter: {
        start: 0,
        count: 12
      }
    }
    this.getMovieListData(urlAndParam);
    this.setData({
      title: options.title,
      urlAndParam
    })
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