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