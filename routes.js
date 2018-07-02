const router = require('express').Router();


router.get('/',         (req, res) => { res.render('index', { title: 'Express' }); })
router.get('/index',    (req, res) => { res.render('index', { title: 'Express' }); })
router.get('/miner',    (req, res) => { res.render('miner', { title: 'Express' }); })
router.get('/cart',     (req, res) => { res.render('cart', { title: 'Express' }); })
router.get('/order',    (req, res) => { res.render('order', { title: 'Express' }); })
router.get('/success',  (req, res) => { res.render('success', { title: 'Express' }); })
router.get('/profile',  (req, res) => { res.render('profile', { title: 'Express' }); })

module.exports = router