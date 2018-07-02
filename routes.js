const router = require('express').Router();


router.get('/',         (req, res) => { res.render('index', { title: 'Express' }); })
router.get('/index',    (req, res) => { res.render('index', { title: 'Express' }); })
router.get('/miner',    (req, res) => { res.render('miner', { title: 'Express' }); })
router.get('/cart',     (req, res) => { res.render('cart', { title: 'Express' }); })
router.get('/order',    (req, res) => { res.render('order', { title: 'Express' }); })
router.get('/order_detail',  (req, res) => { res.render('order_detail', { title: 'Express' }); })
router.get('/profile',  (req, res) => { res.render('profile', { title: 'Express' }); })
router.get('/signup',   (req, res) => { res.render('signup' )})
router.get('/signin',   (req, res) => { res.render('signin' )})
router.get('/forgot-password',   (req, res) => { res.render('forgot-password' )})


module.exports = router