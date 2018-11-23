// miniprogram/pages/setStudents/setStudents.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      const db = wx.cloud.database();
      db.collection("student").where({
        _id: options.id
      }).get({
        success: res => {
          this.setData({
            student: res.data[0]//返回的是一个数组，取第一个
          })
        }, fail: err => {
          console.log(err)
        }
      })
    }
  },

  comfirm: function (e) {
    const db = wx.cloud.database()// 打开数据库连接
    let student = e.detail.value
    if (student.id == "") {// id等于空是新增数据
      this.add(db, student)  // 新增记录
    } else {
      this.update(db, student)  //修改记录
    }
  },
  // 添加学生信息
  add: function (db, student) {
    db.collection("student").add({
      data: {
        name: student.name,
        age: student.age,
        clazz: student.clazz
      }, success: res => {
        wx.showToast({
          title: '添加成功',
        })
        wx.navigateTo({
          url: '../student/student',
        })
      }, fail: err => {
        wx.showToast({
          title: '添加失败',
        })
      }
    })
  },
  //修改学生信息
  update: function (db, student) {
    db.collection("student").doc(student.id).update({
      data: {
        name: student.name,
        age: student.age,
        clazz: student.clazz
      }, success: res => {
        wx.showToast({
          title: '修改成功',
        })
        wx.navigateTo({
          url: '../student/student',
        })
      }, fail: err => {
        wx.showToast({
          title: '修改失败',
        })
      }
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