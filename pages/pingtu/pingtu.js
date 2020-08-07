// pages/pingtu/pingtu.js
var num = [
	['00', '01', '02'],
	['10', '11', '12'],
	['20', '21', '22']
];
var w = 100;

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: '/images/pingtu/pic01.jpg',
		isWin: false
	},
	drawCanvas() {
		let ctx = this.ctx;
		//清空画布
		ctx.clearRect(0, 0, 300, 300)

		//绘制拼图
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (num[i][j] != '22') {
					//获取行和列
					var row = parseInt(num[i][j] / 10)
					var col = num[i][j] % 10
					//绘制方块
					ctx.drawImage(this.data.url, col * w, row * w, w, w, j * w, i * w, w, w)
				}

			}
		}
		ctx.draw()
	},
	shuffle() {
		num = [
			['00', '01', '02'],
			['10', '11', '12'],
			['20', '21', '22']
		];
		//记录当前空白方块的行和列
		let row = 2
		let col = 2
		//打乱顺序
		for (let i = 0; i < 1000; i++) {
			//随机产生其中一个方向
			let direction = Math.round(Math.random() * 3)
			//上
			if (direction == 0) {
				//空白方块不在最上面一行
				if (row != 0) {
					num[row][col] = num[row - 1][col]
					num[row - 1][col] = '22'
					//更新空白方块行
					row -= 1
				}
				//下	
			} else if (direction == 1) {
				if (row != 2) {
					num[row][col] = num[row + 1][col]
					num[row + 1][col] = '22'
					row += 1
				}
				//左	
			} else if (direction == 2) {
				if (col != 0) {
					num[row][col] = num[row][col - 1]
					num[row][col - 1] = '22'
					col -= 1
				}
				//右	
			} else if (direction == 3) {
				if (col != 2) {
					num[row][col] = num[row][col + 1]
					num[row][col + 1] = '22'
					col += 1
				}

			}
		}

	},
	touchBox(e) {
		if (this.data.isWin) {
			return
		}
		var x = e.changedTouches[0].x
		var y = e.changedTouches[0].y

		var row = parseInt(y / w)
		var col = parseInt(x / w)
		//如果点击的不是空白位置
		if (num[row][col] != '22') {
			this.moveBox(row, col)
			this.drawCanvas()
			if (this.isWin()) {
				let ctx = this.ctx
				ctx.drawImage(this.data.url, 0, 0)
				ctx.setFillStyle('#E64340')
				ctx.setTextAlign('center')
				ctx.setFontSize(60)
				ctx.fillText('游戏成功', 150, 150)
				ctx.draw()
			}
		}
	},
	moveBox(i, j) {
		//情况1：如果被点击的方块不在最上方，检查可否上移
		if (i > 0) {
			//如果方块上方是空白
			if (num[i - 1][j] == '22') {
				//交换方块与空白的位置
				num[i - 1][j] = num[i][j]
				num[i][j] = '22'
				return
			}
		}
		//情况2：如果被点击的方块不在最下方，检查可否下移
		if (i < 2) {
			//如果方块下方是空白
			if (num[i + 1][j] == '22') {
				//交换方块与空白的位置
				num[i + 1][j] = num[i][j]
				num[i][j] = '22'
				return
			}
		}
		//情况3：如果被点击的方块不在最左方，检查可否左移
		if (j > 0) {
			//如果方块上方是空白
			if (num[i][j - 1] == '22') {
				//交换方块与空白的位置
				num[i][j - 1] = num[i][j]
				num[i][j] = '22'
				return
			}
		}
		//情况4：如果被点击的方块不在最右方，检查可否右移
		if (j < 2) {
			//如果方块上方是空白
			if (num[i][j + 1] == '22') {
				//交换方块与空白的位置
				num[i][j + 1] = num[i][j]
				num[i][j] = '22'
				return
			}
		}
	},
	isWin() {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				//如果有方块位置不对
				if (num[i][j] != i * 10 + j) {
					return false
				}
			}
		}
		this.setData({
			isWin: true
		})
		return true
	},
	restartGame() {
		this.setData({
			isWin: false
		})
		this.shuffle()
		this.drawCanvas()
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let url = '/images/pingtu/' + options.level
		this.setData({
			url: url
		})
		this.ctx = wx.createCanvasContext('myCanvas')
		this.shuffle()
		this.drawCanvas()
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
