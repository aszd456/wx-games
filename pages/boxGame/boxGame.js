import {
	maps
} from '../../utils/data.js'
// pages/boxGame/boxGame.js
var map = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
]
//箱子图层数据
var box = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
]
//方块的宽度
var w = 40
//初始化小鸟的行与列
var row = 0
var col = 0
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		level: 1
	},
	initMap(level) {
		let mapData = maps[level]
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				box[i][j] = 0
				map[i][j] = mapData[i][j]
				if (mapData[i][j] == 4) {
					box[i][j] = 4
					map[i][j] = 2
				} else if (mapData[i][j] == 5) {
					map[i][j] = 2
					//记录小鸟当前行和列
					row = i
					col = j
				}
			}
		}
	},
	drawCanvas() {
		let ctx = this.ctx
		ctx.clearRect(0, 0, 320, 320)
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				//默认道路
				let img = 'ice'
				if (map[i][j] == 1) {
					img = 'stone'
				} else if (map[i][j] == 3) {
					img = 'pig'
				}
				ctx.drawImage('/images/boxgame/icons/' + img + '.png', j * w, i * w, w, w)
				if (box[i][j] == 4) {
					ctx.drawImage('/images/boxgame/icons/box.png', j * w, i * w, w, w)
				}
			}
		}
		ctx.drawImage('/images/boxgame/icons/bird.png', col * w, row * w, w, w)
		ctx.draw()
	},
	/**
	 * 自定义函数--方向键：上
	 */
	up() {
		//如果不在最顶端才考虑上移
		if (row > 0) {
			//如果上方不是墙或箱子,可以移动小鸟
			if (map[row - 1][col] != 1 && box[row - 1][col] != 4) {
				//更新当前小鸟坐标
				row = row - 1
			}
			//如果上方是箱子
			else if (box[row - 1][col] == 4) {
				//如果箱子不在最顶端才能考虑推动
				if (row - 1 > 0) {
					//如果箱子上方不是墙或箱子
					if (map[row - 2][col] != 1 && box[row - 2][col] != 4) {
						box[row - 2][col] = 4
						box[row - 1][col] = 0
						//更新当前小鸟坐标
						row = row - 1
					}
				}
			}
			//重新绘制地图
			this.drawCanvas()
			//检查游戏是否成功
			this.checkWin()
		}
	},
	/**
	 * 自定义函数--方向键：下
	 */
	down() {
		//如果不在最底端才考虑下移
		if (row < 7) {
			//如果下方不是墙或箱子,可以移动小鸟
			if (map[row + 1][col] != 1 && box[row + 1][col] != 4) {
				//更新当前小鸟坐标
				row = row + 1
			}
			//如果下方是箱子
			else if (box[row + 1][col] == 4) {
				//如果箱子不在最底端才能考虑推动
				if (row + 1 < 7) {
					//如果箱子下方不是墙或箱子
					if (map[row + 2][col] != 1 && box[row + 2][col] != 4) {
						box[row + 2][col] = 4
						box[row + 1][col] = 0
						//更新当前小鸟坐标
						row = row + 1
					}
				}
			}
			//重新绘制地图
			this.drawCanvas()
			//检查游戏是否成功
			this.checkWin()
		}
	},
	/**
	 * 自定义函数--方向键：左
	 */
	left() {
		//如果不在最左侧才考虑左移
		if (col > 0) {
			//如果左侧不是墙或箱子,可以移动小鸟
			if (map[row][col - 1] != 1 && box[row][col - 1] != 4) {
				//更新当前小鸟坐标
				col = col - 1
			}
			//如果左侧是箱子
			else if (box[row][col - 1] == 4) {
				//如果箱子不在最左侧才能考虑推动
				if (col - 1 > 0) {
					//如果箱子左侧不是墙或箱子
					if (map[row][col - 2] != 1 && box[row][col - 2] != 4) {
						box[row][col - 2] = 4
						box[row][col - 1] = 0
						//更新当前小鸟坐标
						col = col - 1
					}
				}
			}
			//重新绘制地图
			this.drawCanvas()
			//检查游戏是否成功
			this.checkWin()
		}


	},
	/**
	 * 自定义函数--方向键：右
	 */
	right() {
		//如果不在最右侧才考虑右移
		if (col < 7) {
			//如果右侧不是墙或箱子,可以移动小鸟
			if (map[row][col + 1] != 1 && box[row][col + 1] != 4) {
				//更新当前小鸟坐标
				col = col + 1
			}
			//如果右侧是箱子
			else if (box[row][col + 1] == 4) {
				//如果箱子不在最右侧才能考虑推动
				if (col + 1 < 7) {
					//如果箱子右侧不是墙或箱子
					if (map[row][col + 2] != 1 && box[row][col + 2] != 4) {
						box[row][col + 2] = 4
						box[row][col + 1] = 0
						//更新当前小鸟坐标
						col = col + 1
					}
				}
			}
			//重新绘制地图
			this.drawCanvas()
			//检查游戏是否成功
			this.checkWin()
		}
	},
	isWin() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				//如果有箱子没在终点
				if (box[i][j] == 4 && map[i][j] != 3) {
					return false
				}
			}
		}
		return true
	},
	checkWin() {
		if (this.isWin()) {
			wx.showModal({
				title: '恭喜',
				content: '成功通关',
				showCancel: false,
				success: (res) => {
					wx.navigateBack()
				}
			})
		}
	},
	restartGame() {
		this.initMap(this.data.level - 1)
		this.drawCanvas()
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let level = options.level
		this.setData({
			level: parseInt(level) + 1
		})
		this.ctx = wx.createCanvasContext('myCanvas')
		this.initMap(level)
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
