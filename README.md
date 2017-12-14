# 基于Vue 2.0的数据售卖平台
* [**预览地址**](https://hz-rotatingblock.github.io/OnlineRetailersProject/dist/#/)
* **测试用户名：View@**
* **密码：123456**
## 功能模块/组件
### 首页
* **数据列表模块**
* **数据商品模块**
* **幻灯片组件**
* **登录/登录组件**

### 产品详情
* **数据统计模块**
* **数据预测模块**
* **流量分析模块**
* **广告发布模块**
* **数量增减组件**
* **项目选择组件（单选/多选）**
* **下拉选择组件**

### 产品列表
* **产品列表模块**
* **列表数据正/逆序排序**

### 其他
* **弹窗组件**
* **银行选择组件**
* **日期选择组件**

## 项目基本结构
	    .
	    |-- build                      	// 项目构建相关
	    |-- config  				 	// 项目开发环境配置
		|-- node_modules				
	    |-- src  						// 源码目录
	    |   |-- components 				// 公共组件
		|		|-- base				// 基础组件相关
		|	|-- router					// 路由设置目录
		|		|-- index.js			// 路由设置入口问文件
	    |   |-- store  					// vuex状态数据仓库
		|		|-- modules				// 子数据仓库
		|		|-- index.js			// 数据仓库入口文件
	    |   |-- App.vue					// 主组件
	    |   |-- main.js					// 程序入口文件，加载各种公共组件
		|	|-- views					// 较独立的组件
		|		|-- detail				// 产品详情各模块
	    |-- static  					
	    |-- .babelrc 					
	    |-- .editorconfig				// 编译器配置
		|-- .eslintignore				// 忽略检查设置
		|-- .eslintrc.js				// eslint配置文件
	    |-- .gitignore   				// git上传忽略的文件格式    
	    |-- favicon.ico 
	    |-- index.html   				// 入口页面
	    |-- package.json 				// 项目基本信息
		|-- README.md					// 项目说明
	    .

## 项目预览
* **主页**
![](https://i.imgur.com/YYv5WJI.gif)
![](https://i.imgur.com/l1WeDuf.gif)

* **产品详情**
![](https://i.imgur.com/pBBZKN7.gif)
![](https://i.imgur.com/SVN9OTX.gif)

* **产品列表**
![](https://i.imgur.com/zuKCwUZ.gif)