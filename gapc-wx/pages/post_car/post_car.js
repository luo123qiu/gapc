// pages/post_car/post_car.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    time: '',
    highway: false,
    contact: '',
    remark: '',
    start: '孔雀城',
    end: '天宫院地铁站',
    seat: '4',

    remarkLength: '0',
    start_local: ["孔雀城", "大卫城", "英国宫", "固安汽车站", "京南绿洲", "中宏新界", "天顺家园", "绿宸万华城", "中鼎凤凰城", "固安县政府", "金海太阳城", "固安县人民医院", "和美紫晶花园", "固安其他", "天宫院地铁站", "西红门地铁站", "首都机场", "北京西站", "北京南站", "亦庄", "北京其他"],
    start_local_index: 0,
    end_local: ["孔雀城", "大卫城", "英国宫", "固安汽车站", "京南绿洲", "中宏新界", "天顺家园", "绿宸万华城", "中鼎凤凰城", "固安县政府", "金海太阳城", "固安县人民医院", "和美紫晶花园", "固安其他", "天宫院地铁站", "西红门地铁站", "首都机场", "北京西站", "北京南站", "亦庄", "北京其他"],
    end_local_index: 14,
    seat_count: ["6", "5", "4", "3", "2", "1"],
    seat_count_index: 2
  },
  bindHighWayChange: function (e) {
    this.setData({
      highway: e.detail.value
    })
  },
  bindContactInput: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },
  bindTxtInput: function (e) {
    var txt = e.detail.value
    var txtLength = txt.length
    this.setData({
      remarkLength: txtLength,
      remark: txt
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindSeatCountChange: function (e) {
    var index = e.detail.value
    this.setData({
      seat: this.data.seat_count[index],
      seat_count_index: index
    })
  },
  bindStartLocalChange: function (e) {
    var index = e.detail.value
    var eindex = this.data.end_local_index
    this.setData({
      start: this.data.start_local[index],
      start_local_index: index
    })
    if (index > 13) {
      if (eindex > 13) {
        this.setData({
          end_local_index: 0
        })
      }
    } else {
      if (eindex < 13) {
        this.setData({
          end_local_index: 14
        })
      }
    }
  },
  bindEndLocalChange: function (e) {
    var index = e.detail.value
    var sindex = this.data.start_local_index
    this.setData({
      end: this.data.end_local[index],
      end_local_index: index
    })
    if (index < 14) {
      if (sindex < 14) {
        this.setData({
          start_local_index: 14
        })
      }
    } else {
      if (sindex > 13) {
        this.setData({
          start_local_index: 0
        })
      }
    }
  },
  exchangeLocal: function(e) {
    //交换地点
    var that = this
    var start = that.data.start
    var end = that.data.end
    var start_index = that.data.start_local_index
    var end_index = that.data.end_local_index
    that.setData({
      start: end,
      end: start,
      start_local_index: end_index,
      end_local_index: start_index
    })
  },
  //提交数据
  submitPost: function (e) {
    wx.showToast({
      title: '正在提交',
      icon: 'loading'
    })
    var that = this
    var highway = that.data.highway
    if (highway) {
      highway = 1;
    } else {
      highway = 0;
    }
    wx.request({
      url: app.globalData.apiBaseUrl + 'postcar',
      method: 'POST',
      data: { go_date: that.data.date, go_time: that.data.time, start_local: that.data.start, end_local: that.data.end, highway: highway, seat_count: that.data.seat, contact: that.data.contact, remark: that.data.remark, username: app.globalData.dbUserInfo.username, openid: app.globalData.dbUserInfo.openid },
      dataType: 'json',
      success: function (res) {
        var d = res.data
        if (d.status == false) {
          wx.showModal({
            title: '提示',
            content: d.msg,
            showCancel: false
          })
        } else {
          //console.log(res)
          //提交成功后，更新用户的拼车信息
          wx.request({
            url: app.globalData.apiBaseUrl + 'updateuser',
            data: { tp: 'driver', opid: app.globalData.dbUserInfo.openid, start_local: that.data.start, end_local: that.data.end, contact: that.data.contact },
            method: 'POST',
            success: function (json) {
              //console.log(json.data)
            }
          })
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/drivers/drivers',
            })
          }, 2000)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showToast({
      title: '获取数据中',
      icon: 'loading'
    })
    //拿到用户信息并自动填入
    var userInfo = app.globalData.dbUserInfo
    if (userInfo) {
      //console.log(userInfo)
      var slocal = userInfo.start_local
      var start_local = that.data.start_local
      var slocal_exist = start_local.findIndex(function (x) { return x == slocal })
      var elocal = userInfo.end_local
      var end_local = that.data.end_local
      var elocal_exist = end_local.findIndex(function (x) { return x == elocal })
      var ucontact = userInfo.contact
      var uhighway = userInfo.highway
      if (slocal && slocal_exist > -1) {
        that.setData({
          start: slocal,
          start_local_index: slocal_exist
        })
      }
      if (elocal && elocal_exist > -1) {
        that.setData({
          end: elocal,
          end_local_index: elocal_exist
        })
      }
      if (ucontact) {
        that.setData({
          contact: ucontact
        })
      }
      wx.hideToast()
    } else {
      //未获取到用户信息的话，自动报错并返回到主页
      wx.showModal({
        title: '重要提醒',
        content: '您必须登录后才可以发布和管理拼车信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/drivers/drivers',
            })
          }
        }
      })
    }
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