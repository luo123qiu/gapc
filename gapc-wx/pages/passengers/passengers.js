// pages/passengers/passengers.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    empty: false,
    today: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //此页面不再处理未授权的情况
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  call: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var opid = e.currentTarget.dataset.openid
    // console.log(opid)
    // console.log(app.globalData.dbUserInfo.openid)
    if (opid != app.globalData.dbUserInfo.openid) {
      var contact = e.currentTarget.dataset.contact
      var idx = e.currentTarget.dataset.index
      var info = that.data.lists[idx]
      var completed = info.completed
      // console.log(completed)
      if (completed == 0) {
        wx.makePhoneCall({
          phoneNumber: contact,
          success: function (res) {
            //拨打电话成功后弹窗提醒操作
            wx.showModal({
              title: '帮助我们做得更好',
              content: '请告诉我们是否已和乘客约好？',
              confirmText: '是',
              cancelText: '否',
              success: function (re) {
                if (re.confirm) {
                  //修改列表数据
                  that.data.lists[idx].completed = 1
                  that.data.lists.splice(idx, 1)
                  that.setData({
                    lists: that.data.lists
                  })
                  if (that.data.lists.length < 1) {
                    that.setData({
                      empty: true
                    })
                  } else {
                    that.setData({
                      empty: false
                    })
                  }
                  //改变乘客信息状态
                  wx.request({
                    url: app.globalData.apiBaseUrl + 'passengers',
                    data: { id: id },
                    method: 'POST',
                    success: function (json) {
                      wx.showToast({
                        title: '感谢您的反馈',
                        icon: 'success',
                        duration: 2000
                      })
                    }
                  })
                  //改变司机和乘客的拼车订单次数
                  app.changeOrderCount(app.globalData.dbUserInfo.openid, opid)
                  //生成订单
                  app.creatOrder('passenger', app.globalData.dbUserInfo.openid, opid, app.globalData.dbUserInfo.username, info.username, info.start_local, info.end_local, info.go_date, info.go_time, '')
                } else {
                  //console.log('没约好')
                }
              }
            })
          }, fail: function () {
            //console.log('用户取消拨打')
          }
        })
      } else {
        wx.showModal({
          content: 'TA刚才已经拼好车啦',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              //在列表中清空此条数据
              that.data.lists.splice(idx, 1)
              that.setData({
                lists: that.data.lists
              })

            }
          }
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var util = require('../../utils/util.js');
    //加载拼车信息
    that.setData({
      today: util.formatTime(new Date())
    })
    wx.showToast({
      title: '数据加载中',
      icon: 'loading'
    })
    wx.request({
      url: app.globalData.apiBaseUrl + 'passengers',
      dataType: 'json',
      method: 'POST',
      success: function (res) {
        wx.hideToast()
        //console.log(res.data)
        that.setData({
          lists: res.data
        })
        if (that.data.lists.length < 1) {
          that.setData({
            empty: true
          })
        } else {
          that.setData({
            empty: false
          })
        }
      }
    })
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