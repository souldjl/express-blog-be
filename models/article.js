const { mongoose } = require('../core/mongodb');
const autoIncrement = require('mongoose-auto-increment-fix');

const articleSchemle = new mongoose.Schema({
    // 标题
    title: { type: String, required: true, validate: /\S+/ },
    
    // 文章关键字（SEO）
    keyword: [{ type: String, required: true }],

    //作者
    author: { type: String, required: true },

    //文章描述 
    desc: { type: String, default: '' },
    
    // 文章内容
    content: { type: String, required: true, validate: /\S+/ },

    // 字数
    numbers: { type: Number, required: true, default: 0 },
    // 封面
    img_url: {type:String, default: 'http://waaaat.storage.comocloud.net/waaaat/2018/05/31/20180531160156b2e7e06b.jpg'},

    // 文章发布状态 => 0 草稿，1 已发布
    state: { type: Number, default: 1 },

    // 其他元信息
	meta: {
		views: { type: Number, default: 0 },
		likes: { type: Number, default: 0 },
		comments: { type: Number, default: 0 },
	},
    
    create_time: { type: Date, default: Date.now },
    update_time: { type: Date, default: Date.now },
});

articleSchemle.plugin(autoIncrement.plugin, {
    model: 'Article',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
});

module.exports = mongoose.model('Article', articleSchemle);