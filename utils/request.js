export function httpGet(url, callback) {
  wx.request({
    url: url,
    method: 'GET',
    data: {},
    header: {
      "Content-Type": "application/json"
    },
    success: (res)=> {
      return callback(res)
    },
    fail: (error)=>{
      console.log(error)
    }
  });
}