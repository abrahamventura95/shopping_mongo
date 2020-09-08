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
module.exports = router;