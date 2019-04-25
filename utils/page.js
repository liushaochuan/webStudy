export function gotoMovieDetail(event) {
  wx.navigateTo({
    url: "/pages/movie-detail/movie-detail?movieId=" + event.currentTarget.dataset.movieId
  });
}