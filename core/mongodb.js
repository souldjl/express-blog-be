/*
 * @Author: daijiulong@baidu.com
 * @Date: 2020-12-28 22:59:16
 * @LastEditTime: 2020-12-30 14:42:36
 * @Description: 
 * @FilePath: /express-blog-be/core/mongodb.js
 */

const consola = require('consola')
const CONFIG = require('../app.config.js')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment-fix')

// remove DeprecationWarning
mongoose.set('useFindAndModify', false)

// mongoose Promise
mongoose.Promise = global.Promise
exports.connect = () => {
    mongoose.connect(CONFIG.MONGODB.uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        promiseLibrary: global.Promise
    })
}

// 连接错误
mongoose.connection.on('error', error => {
    consola.warn('数据库连接失败!', error)
})

// 连接成功
mongoose.connection.once('open', () => {
    consola.ready('数据库连接成功!')
})

autoIncrement.initialize(mongoose.connection)

exports.mongoose = mongoose
