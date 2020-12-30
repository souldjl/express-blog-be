/*
 * @Author: daijiulong@baidu.com
 * @Date: 2020-12-28 22:08:27
 * @LastEditTime: 2020-12-30 14:22:16
 * @Description: 
 * @FilePath: /express-blog-be/app.js
 */
const express = require('express');
const app = express();
const router = require('./router/index')
const bodyParser = require('body-parser');
const session = require('express-session');
const mongodb = require('./core/mongodb');
mongodb.connect();
// import 等语法要用到 babel 支持
require('babel-register');

// session
app.use(
	session({
		secret: 'blog_node_cookie',
		name: 'session_id', //# 在浏览器中生成cookie的名称key，默认是connect.sid
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 60 * 1000 * 30, httpOnly: true }, //过期时间
	}),
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(router);

module.exports = app;