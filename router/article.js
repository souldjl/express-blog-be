/*
 * @Author: daijiulong@baidu.com
 * @Date: 2020-12-30 14:57:04
 * @LastEditTime: 2021-01-18 15:17:42
 * @Description: 
 * @FilePath: /express-blog-be/router/article.js
 */
import { responseClient } from '../util/util';
const Article = require('../models/article');

exports.addArticle = (req, res) => {
    let { title, keyword, author, desc, content, numbers, img_url, state } = req.body;
    let arctile = new Article({title, keyword, author, desc, content, numbers, img_url, state });
    arctile.save().then((result) => {
        responseClient(res, 200, 0, '操作成功', result) 
    }).catch((err) => {
        responseClient(res, 500, 0, err.message)
    })
}

exports.delArticle = (req, res) => {
    let {id} = req.body;
    id = id.replace(/"/g, '')
    Article.findByIdAndRemove({_id: id}).then((result) => {
        responseClient(res, 200, 0, '操作成功', result)
    }).catch(err => {
        responseClient(res, 500, 3, '操作失败')
    })
}

exports.editArticle = (req, res) => {
    const { id, title, keyword, author, desc, content, numbers, img_url, state } = req.body; 
    Article.updateOne({_id: id}, {title, keyword, author, desc, content, numbers, img_url, state}).then(result => {
        responseClient(res, 200, 0, '操作成功', result)
    }).catch(err=> {
        responseClient(res, 500, 3, '操作失败')
    })
}

exports.getArticleList = (req, res) => {
    let {
        pageSize, pageNum
    } = req.query;

    pageNum = pageNum ? parseInt(pageNum) : 1;
    pageSize = pageSize ? parseInt(pageSize) : 10;

    // 如果小于1 则取0
    let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
    let query = {};
    let fields = {};

    let filters = {
        skip: skip,
        limit: pageSize,
        sort: { 'create_time': -1 }
    };
    Article.find(query, fields, filters, (err, data) => {
        if (err) {
            responseClient(res, 500, 3, '获取失败')
        }
        responseClient(res, 200, 0, '获取成功', data)
    })

}

exports.getArticleDetail = (req, res) => {
    let {id} = req.query;
    id = id.replace(/"/g, '')
    Article.findOne({_id: id}).then((result) => {
        responseClient(res, 200, 0, '操作成功', result)
    }).catch(err => {
        responseClient(res, 500, 3, '操作失败')
    })
}

