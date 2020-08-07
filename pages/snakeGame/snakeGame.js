// pages/snakeGame/snakeGame.js
//蛇身长度
var t = 3
//记录蛇的运动轨迹，用数组记录每个坐标点
var snakeMap = []
//蛇身单元格大小
var w = 20
//方向代码：上：1，下：2，左：3，右：4
var direction = 1
//初始坐标
var x = 0,
	y = 0
//食物初始坐标
var foodX = 0
var foodY = 0

//画布宽高
var width = 320
var height = 320
//游戏界面刷新间隔时间，单位为毫秒
var time = 1000
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		score: 0
	},
	gameStart() {
		this.setData({
			score: 0
		})
		t = 3
		snakeMap = []

		//随机生成初始蛇头坐标
		x = Math.floor(Math.random() * width / w) * w
		y = Math.floor(Math.random() * height / w) * w

		//随机初始前进方向
		direction = Math.ceil(Math.random() * 4)

		foodX = Math.floor(Math.random() * width / w) * w
		foodY = Math.floor(Math.random() * height / w) * w

		this.interval = setInterval(() => {
			this.gameRefresh()
		}, time)
	},
	drawFood() {
		let ctx = this.ctx
		ctx.setFillStyle('red')
		ctx.fillRect(foodX, foodY, w, w)
	},
	drawSnake() {
		let ctx = this.ctx
		ctx.setFillStyle('lightblue')
		for (let i = 0; i < snakeMap.length; i++) {
			ctx.fillRect(snakeMap[i].x, snakeMap[i].y, w, w)
		}
	},
	/**
	 * 碰撞检测
	 */
	detectCollision() {
		if (x > width || y > height || x < 0 || y < 0) {
			return 1
		}
		for (let i = 0; i < snakeMap.length; i++) {
			if (snakeMap[i].x == x && snakeMap[i].y == y) {
				return 2
			}
		}
		return 0
	},
	/**
	 * 画面刷新
	 */
	gameRefresh() {
		this.drawFood()

		//将当前坐标添加到贪吃蛇的运动轨迹坐标数组中
		snakeMap.push({
			'x': x,
			'y': y
		})

		//数组只保留蛇身长度的数据，如果蛇前进了，则删除最旧的坐标
		if (snakeMap.length > t) {
			snakeMap.shift()
		}

		this.drawSnake()

		if (foodX == x && foodY == y) {
			let score = this.data.score + 10
			this.setData({
				score: score
			})

			foodX = Math.floor(Math.random() * width / w) * w
			foodY = Math.floor(Math.random() * height / w) * w

			this.drawFood()

			t++

		}
		//绘制全部内容
		this.ctx.draw()
		switch (direction) {
			case 1:
				y -= w
				break
			case 2:
				y += w
				break
			case 3:
				x -= w
				break
			case 4:
				x += w
				break
		}
		let code = this.detectCollision()
		if (code != 0) {
			clearInterval(this.interval)

			let msg = ''
			if (code == 1) {
				msg = '撞墙了'
			} else {
				msg = '自杀了'
			}
			wx.showModal({
				title: '游戏失败，是否重来',
				content: msg,
				success: (res) => {
					if (res.confirm) {
						this.gameStart()
					}else{
						clearInterval(this.interval)
						wx.navigateBack()
					}
				}
			})
		}
	},
	up() {
		direction = 1
	},
	down() {
		direction = 2
	},
	left() {
		direction = 3
	},
	right() {
		direction = 4
	},
	restartGame() {
		this.gameStart()
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		time = options.time

		this.ctx = wx.createCanvasContext('myCanvas')

		this.gameStart()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {
		clearInterval(this.interval)
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
