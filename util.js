var util = {};
util.ajax = function (option) {
  let opt = {
    url: '',
    type: 'get',
    data: {},
    success() {},
    error() {}
  }
  opt = extend(opt, option)
  if (opt.url) {
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP')
    var data = opt.data
    var url = opt.url
    var type = opt.type.toUpperCase()
    var dataArr = []
    for(let key in data) {
      dataArr.push(key + '=' + data[key])
    }
    if(opt.type == 'GET') {
      url = url + '?' + dataArr.join('&')
      xhr.open(type, url, true)
      xhr.send()
    } else if(opt.type == "POST") {
      xhr.open(typem, url, true)
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.send(dataArr.join('&'))
    }
    // onreadystatechange
    xhr.onload = function() {
      if(xhr.status === 200 || xhr.status === 304 || xhr.status === 206) {
        var res 
        if(opt.success && opt.success instanceof Function) {
          res = xhr.responseText
          if(typeof res === 'string') {
            res = JSON.parse(res)
            opt.success(res)
          }
        } else if (opt.error && opt.error instanceof Function) {
          opt.error.call(xhr, res)
        }
      }
    }
  }
}