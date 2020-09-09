var express 		= require('express');
var router 			= express.Router();
var auth 			= require('../middleware/auth');
var Controller 		= require('../controllers/product');

router.post('/',auth.ensureAuthenticated, auth.isShop, Controller.create);
router.get('/search', Controller.search);
router.get('/all', Controller.getAll);
router.get('/shop', Controller.getAllByShop);
router.get('/', Controller.get);
router.put('/', auth.ensureAuthenticated, auth.isShop, Controller.update);
router.delete('/', auth.ensureAuthenticated, auth.isShop, Controller.delete);

router.post('/category', auth.ensureAuthenticated, auth.isAdmin, Controller.createCtgr);
router.get('/category/all', Controller.getAllCtgr);
router.put('/category', auth.ensureAuthenticated, auth.isAdmin, Controller.updateCtgr);
router.delete('/category', auth.ensureAuthenticated, auth.isAdmin, Controller.deleteCtgr);


router.post('/pcategory', auth.ensureAuthenticated, auth.isShop, Controller.createProductCtgr);
router.get('/pcategory/product', Controller.getProductCtgr);
router.get('/pcategory/category', Controller.getCtgrProduct);
router.delete('/pcategory', auth.ensureAuthenticated, auth.isShop, Controller.deleteProductCtgr);

module.exports = router;