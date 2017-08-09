//app.js
App({
  globalData: {
    apiBaseUrl: 'https://awuhan.com/',

    openid: null,
    userInfo: {},
    dbUserInfo: {}
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getLoginStatus: function (cb) {
    //获取登录状态，返回登录状态
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          //获取到code，向后端请求openid
          wx.request({
            url: that.globalData.apiBaseUrl + 'getopenid',
            data: { js_code: res.code },
            method: 'POST',
            success: function (json) {
              //openid写入公共数据
              that.globalData.openid = json.data.openid
              typeof cb == "function" && cb(true)
            }
          })
        } else {
          typeof cb == "function" && cb(false)
        }
      }, fail: function () {
        typeof cb == "function" && cb(false)
      }
    })
  },
  getUserInfo: function (cb) {
    //获取用户授权，返回授权状态
    var that = this
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        if (res) {
          //userInfo写入公共数据
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(true)
        } else {
          typeof cb == "function" && cb(true)
        }
      }, fail: function () {
        typeof cb == "function" && cb(false)
      }
    })
  },
  creatUser: function (cb) {
    //尝试创建用户，返回用户全部信息
    var that = this
    var userInfo = that.globalData.userInfo
    wx.request({
      url: that.globalData.apiBaseUrl + 'creatuser',
      data: { openid: that.globalData.openid, username: userInfo.nickName, avatar: userInfo.avatarUrl, gender: userInfo.gender, country: userInfo.country, province: userInfo.province, city: userInfo.city },
      method: 'POST',
      success: function (res) {
        if (res.data.status) {
          that.globalData.dbUserInfo = res.data.dbUserInfo[0]
          typeof cb == "function" && cb(true)
        } else {
          typeof cb == "function" && cb(false)
        }
      }, fail: function (res) {
        typeof cb == "function" && cb(false)
      }
    })
  },
  reAuth: function (cb) {
    //调起重新授权的设置
    wx.openSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo']) {
          typeof cb == "function" && cb(false)
        } else {
          typeof cb == "function" && cb(true)
        }
      }
    })
  },
  checkModal: function (cb) {
    //提醒授权
    wx.showModal({
      title: '重要提醒',
      content: '您必须登录后才可以发布和管理拼车信息',
      confirmText: '登录',
      cancelText: '不登录',
      success: function (ms) {
        if (ms.confirm) {
          typeof cb == "function" && cb(true)
        } else {
          typeof cb == "function" && cb(false)
        }
      }
    })
  },
  changeOrderCount: function (did, pid) {
    var that = this
    //console.log(did+','+pid)
    wx.request({
      url: that.globalData.apiBaseUrl + 'updateuser',
      data: { tp: 'driver_order', opid: did },
      method: 'POST',
      success: function (res) {
        //console.log(res.data.msg)
      }
    })
    wx.request({
      url: that.globalData.apiBaseUrl + 'updateuser',
      data: { tp: 'user_order', opid: pid },
      method: 'POST',
      success: function (res) {
        //console.log(res.data.msg)
      }
    })
  },
  creatOrder: function (tp, did, pid, dusername, pusername, start_local, end_local, go_date, go_time, highway) {
    //console.log(tp + ',' + did + ',' + pid + ',' + dusername + ',' + pusername + ',' + start_local + ',' + end_local + ',' + go_date + ',' + go_time + ',' +highway)
    wx.request({
      url: this.globalData.apiBaseUrl + 'creatorder',
      data: {tp: tp, driver: dusername, passenger: pusername, driver_id: did, passenger_id: pid, start_local: start_local, end_local: end_local, go_date: go_date, go_time: go_time, highway: highway},
      method: 'POST',
      success: function(res) {
        //console.log(res.data)
      }
    })
  }
})
