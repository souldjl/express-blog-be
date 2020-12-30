/*
 * @Author: daijiulong@baidu.com
 * @Date: 2020-12-28 22:54:07
 * @LastEditTime: 2020-12-30 11:48:01
 * @Description: 
 * @FilePath: /express-blog-be/router/user.js
 */
const User = require('../models/user');
import { MD5_SUFFIX, responseClient, md5 } from '../util/util.js';

// 登录
exports.login = (req, res) => {
    let { email, password } = req.body;
    if (!email) {
        responseClient(res, 400, 2, '用户邮箱不可为空');
        return;
    }
    if (!password) {
        responseClient(res, 400, 2, '密码不可为空');
        return;
    }
    User.findOne({
        email,
        password: md5(password + MD5_SUFFIX),
    })
        .then(userInfo => {
            if (userInfo) {
                //登录成功后设置session
                req.session.userInfo = userInfo;
                responseClient(res, 200, 0, '登录成功', userInfo);
            } else {
                responseClient(res, 400, 1, '用户名或者密码错误');
            }
        })
        .catch(err => {
            console.log(err)
            responseClient(res);
        });
};

// 登录
exports.logout = (req, res) => {
    const { userInfo } = req.session;
    if (userInfo) {
        req.session.userInfo = null;
        responseClient()
    }
};

// 注册user
exports.register = (req, res) => {
    let { name, password, phone, email, introduce, type } = req.body;
    if (!email) {
        responseClient(res, 400, 2, '用户邮箱不可为空');
        return;
    }
    const reg = new RegExp(
        '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$',
    ); //正则表达式
    if (!reg.test(email)) {
        responseClient(res, 400, 2, '请输入格式正确的邮箱！');
        return;
    }
    if (!name) {
        responseClient(res, 400, 2, '用户名不可为空');
        return;
    }
    if (!password) {
        responseClient(res, 400, 2, '密码不可为空');
        return;
    }
    //验证用户是否已经在数据库中
    User.findOne({ email: email })
        .then(data => {
            if (data) {
                responseClient(res, 200, 1, '用户邮箱已存在！');
                return;
            }
            //保存到数据库
            let user = new User({
                email,
                name,
                password: md5(password + MD5_SUFFIX),
                phone,
                type,
                introduce,
            });
            user.save().then(data => {
                responseClient(res, 200, 0, '注册成功', data);
            });
        })
        .catch(err => {
            responseClient(res);
            return;
        });
};

// 删除user
exports.deleteUser = (req, res) => {
    console.log(req)
    let { email } = req.body;
    //验证用户是否已经在数据库中
    User.remove({ email: email })
        .then(data => {
            if (data) {
                responseClient(res, 200, 0, '删除成功', data);
            }
        })
        .catch(err => {
            responseClient(res);
        });
};
//获取所有用户
exports.allUser = (req, res) => {
    //验证用户是否已经在数据库中
    User.find()
        .then(data => {
            console.log(data)
            res.send(data);
            if (data) {
                res.send(data);
            }
        })
        .catch(err => {
            return;
        });
};