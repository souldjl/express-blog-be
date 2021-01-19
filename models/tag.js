/*
 * @Author: daijiulong@baidu.com
 * @Date: 2021-01-18 14:24:02
 * @LastEditTime: 2021-01-18 15:13:00
 * @Description: 
 * @FilePath: /express-blog-be/models/tag.js
 */
/*
 * @Author: daijiulong@baidu.com
 * @Date: 2021-01-18 14:24:02
 * @LastEditTime: 2021-01-18 14:42:41
 * @Description: 
 * @FilePath: /express-blog-be/models/tags.js
 */
const {mongoose} = require('../core/mongodb');
const autoIncrement = require('mongoose-auto-increment-fix');

const tagSchema = new mongoose.Schema({
    // 标签名称
    name: { type: String, required: true, validate: /\S+/ },

    // 标签描述
    desc: String,

    // 图标
    icon: String,

    // 发布日期
    create_time: { type: Date, default: Date.now },

    // 最后修改日期
    update_time: { type: Date, default: Date.now },
})

tagSchema.plugin(autoIncrement.plugin, {
    model: 'Tag',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
});

module.exports = mongoose.model('Tag', tagSchema);