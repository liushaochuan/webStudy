// pages/movies/movies.js
import { gotoMovieDetail } from "../../utils/page"
import {httpGet} from "../../utils/request"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    moviesList: [],
    openSearch: false,
    searchQuery: {
      url: '/v2/movie/search',
      parameter: {
        q: '',
        start: 0,
        count: 12
      }
    }
  },
  onFocus(event) {
    this.setData({
      openSearch: true
    })
    this.getMovieListBySearch(this.data.searchQuery);
  },
  clear() {
    this.setData({
      openSearch: false,
      ["searchQuery.parameter.q"]: '',
      searchList: []
    });
  },
  onInput(event) {
    this.setData({
      ["searchQuery.parameter.q"]: event.detail.value,
      ["searchQuery.parameter.start"]: 0,
      searchList: []
    })
    this.getMovieListBySearch(this.data.searchQuery);
  },
  onScrollLower() {
    this.getMovieListBySearch(this.data.searchQuery);
  },
  bindButtonTap() {
    this.setData({
      focus: true
    })
  },
  success (res){
    this.setData({
      searchList: this.data.searchList.concat(this.processData(res.data)),
    })
    this.setData({
      ["searchQuery.parameter.start"]: this.data.searchList.length
    })
  },
  getMovieListBySearch(data) {
    var arr = [];
    for(var pa in data.parameter) {
      arr.push(pa + '=' + data.parameter[pa])
    }
    const url = app.globalData.baseUrl + data.url + '?' + arr.join('&');
    httpGet(url, this.success)
  },
   // 请求电影列表
   getMovieListData(data) {
    const that = this;
    const url = app.globalData.baseUrl + data.url;
    // httpGet(url)
    wx.request({
      url: url,
      data: {},
      method: "GET",
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        var key =  "moviesList[" + data.index + "]"
        that.setData({
          [key] : {movies: that.processData(res.data), headerTitle: data.headerTitle, url:  data.url.split('?')[0]},
        })
      },
      fail(err) {
        console.log(err)
      },
      complete() {}
    })
  },
  // 数据处理
  processData (data) {
    const movies = [];
    data.subjects.forEach(movie => {
      var title = movie.title.length >= 6 ? movie.title.substring(0,6) + '…' : movie.title
      movie.rating.stars = parseInt(movie.rating.stars)
      movies.push ({
        title,
        coverUrl: movie.images.large,
        movieId: movie.id,
        rating: movie.rating
      })
    });
    return movies;
  },
  gotoMovieDetail,
  // 跳转到更多电影页面
  gotoMore(event) {
    wx.navigateTo({
      url: '/pages/more-movies/more-movies?url=' + event.target.dataset.url + '&title=' + event.target.dataset.title,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const top250Url = {url: "/v2/movie/top250" + "?start=0" + "&count=3", headerTitle: "口碑榜", index: 0}; // 口碑榜
    const comingUrl =  {url: "/v2/movie/coming_soon" + "?start=0" + "&count=3", headerTitle: "即将上映", index: 1}; // 即将上映
    const inTheatersUrl =  {url: "/v2/movie/in_theaters" + "?start=0" + "&count=3", headerTitle: "正在热映", index: 2}; // 正在热映
    const urlList = [top250Url, comingUrl, inTheatersUrl]
    urlList.forEach(data => {
      this.getMovieListData(data)
    })
    this.setData({
      urlList
    })
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