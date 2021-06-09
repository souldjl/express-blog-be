const Tag = require('../models/tag');
import { responseClient } from '../util/util.js';

// 获取所有标签
exports.getTagList = (req, res) => {
    let responseData = {
        count: 0,
        list: []
    }
    Tag.count({}, (err, count) => {
        if (err) {
            responseClient(res, 500, 3, '服务端异常')
        }
        responseData.count = count;
        const fields = { _id: 1, name: '' };
        const options = {
            sort: { create_time: -1 }
        }
        Tag.find({}, fields, options, (err, result) => {
            if (err) {
                responseClient(res, 500, 3, '服务端异常')
            } else {
                responseData.list = result;
                responseClient(res, 200, 0, '获取成功', responseData)
            }
        })
    })
};

// 增加标签
exports.addTag = (req, res) => {
    let { name, desc } = req.body;
    Tag.findOne({name: name}, (err, result) => {
        if(!result) {
            const newtag = new Tag({name, desc});
            newtag.save((err, result) => {
                if(err) {
                    responseClient(res, 500, 3, '服务端异常') 
                }else{
                    responseClient(res, 200, 0, '添加成功', result)
                }
            })
        } else {
            responseClient(res, 200, 3, '已存在')
        }
    });
};

// 删除标签
exports.delTag = (req, res) => {
    let { id } = req.body;
    Tag.remove({_id: id}, (err, result) => {
        if(err) {
            responseClient(res, 500, 3, '服务端异常')
        } else {
            responseClient(res, 200, 0, '删除成功')
        }
    });
};