/*
 * @Author: daijiulong@baidu.com
 * @Date: 2020-12-28 23:00:52
 * @LastEditTime: 2020-12-30 14:25:49
 * @Description: 
 * @FilePath: /express-blog-be/app.config.js
 */
const path = require('path');
const { argv } = require('yargs');

exports.MONGODB = {
	uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/blogForNode`,
	username: argv.db_username || 'DB_username',
	password: argv.db_password || 'DB_password',
};
