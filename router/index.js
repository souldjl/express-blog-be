
const router = require('express').Router();
const User = require('./user');
const Article = require('./article');
const Tag = require('./Tag');

router.use((req, res, next) => {
    // 不需要session的post请求
    const notNeedSessionRouter = ['/login', '/register'];
    console.log(req.method)
    // if(req.method === 'POST' && notNeedSessionRouter.indexOf(req.pathname) < 0) {
    //     if(!req.session.userInfo ) {
    //         responseClient(res, 500, 2, '未登陆')
    //         return false;
    //     }
    // }
    next();
})

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


router.get('/getTagList', Tag.getTagList);
router.post('/addTag', Tag.addTag);
router.post('/delTag', Tag.delTag);
module.exports = router;