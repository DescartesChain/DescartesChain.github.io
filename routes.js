const router = require('express').Router();
const sigUtil = require('eth-sig-util');

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
router.get('/not-installed', (req, res) => {res.render('not-installed')});
router.get('/not-logged-in', (req, res) => {res.render('not-logged-in')});
// 未绑定
router.get('/binding', (req, res) => {res.render('binding')});
router.get('/signContract/:sig', (req, res) => {

    let msgParams = [{
        type: 'string',
        name: 'Descartes Chain Disclaimer',
        value: 'DCAR x1 is different from consumer electronics. It is specially customized according to customer demands. Made for investment products, investors need to be cautious.  If you purchase this product, you will be considered to be an endorsement of this policy. The paid purchase price will not be refunded, except for the case that the mining machine cannot be delivered. Due to market fluctuations, the price of the product may be adjusted at any time after your purchase. We do not accept the responsibility of prior notice and  Variable price compensation.'
    }]

    let sig = req.params.sig;
    console.log(sig)

    let result = sigUtil.recoverTypedSignature({
        data: msgParams,
        sig: sig
    })

    console.log(result)

    res.send(result)
})



module.exports = router