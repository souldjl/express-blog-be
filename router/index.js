const router = require('express').Router();
const User = require('./user');
import {responseClient} from '../util/util'

router.use((req, res, next) => {
    // 不需要session的post请求
    const notNeedSession = ['/login', '/register'];
    console.log(req.method)
    // if(req.method === 'POST' && notNeedSession.indexOf(req.pathname) < 0) {
    //     if(!req.session.userInfo ) {
    //         responseClient(res, 500, 2, '未登陆')
    //         return false;
    //     }
    // }
    next();
})
const Article = require('./article');
    router.post('/login', User.login);
    router.get('/logout', User.logout);
    router.post('/register', User.register);
    router.post('/deleteUser', User.deleteUser);
    router.get('/allUser', User.allUser);

    router.get('/getArticlelist', Article.getArticleList);
    router.get('/getArticleDetail', Article.getArticleDetail);
    router.post('/addArticle', Article.addArticle);
    router.post('/delArticle', Article.delArticle);
    router.post('/editArticle', Article.editArticle);
   
module.exports = router;