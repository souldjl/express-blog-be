/*
 * @Author: daijiulong@baidu.com
 * @Date: 2020-12-28 22:54:14
 * @LastEditTime: 2020-12-30 14:36:50
 * @Description: 
 * @FilePath: /express-blog-be/models/user.js
 */
const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment-fix');

//name, password, phone, email, introduce, type
const userSchema = new mongoose.Schema({
    name: {type: String, required: true, default: ''},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    introduce: {type: String, required: true, default: ''},
    type: {type: String, required: true}
});

// 自增 ID 插件配置
userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id',
    startAt: 1,
    incrementBy:1
});

const User = mongoose.model('User', userSchema);

module.exports = User;