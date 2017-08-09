// pages/drivers/drivers.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    empty: false,
    today: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.getLoginStatus(function (loginStatus) {
      //调用登录接口，将会返回登录状态
      //console.log(loginStatus)
      if (loginStatus) {
        app.getUserInfo(function (userStatus) {
          //console.log(userStatus)
          //调用授权接口，将会返回授权状态
          if (userStatus) {
            app.creatUser(function (creatStatus) {
              //调用创建用户接口，将会返回是否创建成功
              //console.log(creatStatus)
              //console.log(app.globalData.dbUserInfo)
            })
          } else {
            //处理未授权的情况
            app.checkModal(function (checkStatus) {
              //此处不再重复处理
              if (checkStatus) {
                app.reAuth(function (bk) {
                  if (bk) {
                    //重新授权后，再调用一次公共方法
                    app.getLoginStatus(function () {
                      app.getUserInfo(function () {
                        app.creatUser(function () {
                          //授权成功
                        })
                      })
                    })
                  } else {
                    //不再处理
                  }
                })
              }
            })
          }
        })
      } else {
        //暂不处理未登录的情况
      }
    })
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
      var seat = info.seat_count
      if (seat < 1) {
        wx.showModal({
          content: '此车已拼满',
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
      } else {
        wx.makePhoneCall({
          phoneNumber: contact,
          success: function () {
            //拨打成功，如果用户拼车成功，则让用户选择几人乘坐，减少相应座位
            wx.showModal({
              title: '帮助我们做得更好',
              content: '如果您已成功拼车，请选择乘车人数',
              confirmText: '成功',
              cancelText: '未成功',
              success: function (res) {
                if (res.confirm) {
                  wx.showActionSheet({
                    itemList: [
                      '1人',
                      '2人',
                      '3人',
                      '4人',
                    ],
                    success: function (res) {
                      wx.showToast({
                        title: '数据处理中',
                        icon: 'loading'
                      })
                      //减少相应的乘车人数
                      var new_seat_count = seat - (res.tapIndex + 1)
                      if (new_seat_count < 1) {//拼满啦
                        //在列表中清空数据
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
                      } else {
                        that.data.lists[idx].seat_count = new_seat_count
                        that.setData({
                          lists: that.data.lists
                        })
                      }
                      //将新的座位数量写入数据库
                      wx.request({
                        url: app.globalData.apiBaseUrl + 'drivers',
                        data: { id: id, seat: new_seat_count },
                        dataType: 'json',
                        method: 'POST',
                        success: function (res) {
                          wx.showToast({
                            title: '感谢您的反馈',
                            icon: 'success',
                            duration: 2000
                          })
                        }
                      })
                      //改变司机和乘客的拼车订单次数
                      app.changeOrderCount(opid, app.globalData.dbUserInfo.openid)
                      //生成订单
                      app.creatOrder('driver', opid, app.globalData.dbUserInfo.openid, info.username, app.globalData.dbUserInfo.username, info.start_local, info.end_local, info.go_date, info.go_time, info.highway)
                    },
                    fail: function () {
                      //console.log('用户未选择乘车人数')
                    }
                  })
                } else {
                  //未成功拼车
                  //console.log('未拼车成功')
                }
              }
            })
          },
          fail: function () {
            //取消拨打，不做任何处理
            //console.log('用户取消拨打')
          }
        })
      }
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
      url: app.globalData.apiBaseUrl + 'drivers',
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