// pages/post/post.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  openCar: function () {
    wx.navigateTo({
      url: '/pages/post_car/post_car'
    })
  },

  openUser: function () {
    wx.navigateTo({
      url: '/pages/post_user/post_user'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    app.getLoginStatus(function (loginStatus) {
      //调用登录接口，将会返回登录状态
      if (loginStatus) {
        app.getUserInfo(function (userStatus) {
          if (!userStatus) {
            app.checkModal(function (checkStatus) {
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
                    wx.switchTab({
                      url: '/pages/drivers/drivers',
                    })
                  }
                })
              } else {
                wx.switchTab({
                  url: '/pages/drivers/drivers',
                })
              }
            })
          }
        })
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