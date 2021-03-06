const bcrypt      = require('bcrypt');
const passport    = require('passport');
const jwt         = require('jsonwebtoken');
const error_types = require('./error_types');
const User        = require('../Models/user');

let controller = {
    register: (req, res, next) => {
        User.findOne({ email: req.body.email })
            .then(data => { 
                if (data) { //user exists
                    throw new error_types.InfoError("user already exists");
                }
                else { 
                    var hash = bcrypt.hashSync(req.body.password,
                                               parseInt(
                                                   process.env.BCRYPT_ROUNDS));
                    let document = new User({
                        email: req.body.email,
                        name:  req.body.name  || '',
                        type:  req.body.type  || 'user',
                        password: hash
                    });
                    return document.save();
                }
            })
            .then(data => { 
                res.json({ data: data });
            })
            .catch(err => { 
                next(err);
            })
    },
    login: (req, res, next) => {
        User.findOne({ email: req.body.email })
        	.then(data=> {
        		if(!bcrypt.compareSync(req.body.password, data.password)){
        			throw new error_types.Error404(
                                         "username or password not correct.");
        		}else{
	                const payload = {
	                    sub: data._id,
	                    exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
	                    email: data.email,
                        type: data.type
	                };
	                const token = jwt.sign(JSON.stringify(payload),
                                           process.env.JWT_SECRET, 
                                           {algorithm: 
                                                   process.env.JWT_ALGORITHM});
	                res.json({ data: { token: token } });
        		}
        	})
        	.catch(err => {
        		next(err);
        	})
    },
    getShops: (req, res, next) => {
    	User.find({type: 'shop'}, {password: 0})
            .sort({type: 1, created_at: -1})
            .then(data=>res.json(data));
    },
    get: (req, res, next) => {
        User.findOne({_id:req.param('id')}, {password: 0})
            .then(data=>{res.json(data)})
            .catch(err=>{res.json(err)}) 
    },
    update: (req, res, next) => {
        User.findOne({_id:req.user.sub})
            .then(data=>{
                data.rif      = req.body.rif     || data.rif;
                data.name     = req.body.name    || data.name;
                data.tlfn     = req.body.tlfn    || data.tlfn;
                data.custom   = req.body.custom  || data.custom;
                if(req.body.password != undefined){
                    var hash = bcrypt.hashSync(req.body.password,
                                               parseInt(
                                                   process.env.BCRYPT_ROUNDS));
                    data.password = hash;
                }
                data.save();
                res.json(data)
            })
            .catch(err=>{res.json(err)}) 
    },
    delete: (req, res, next) => {
        User.deleteOne({_id:req.user.sub})
            .then(data=>{
                res.json(data)
            })
            .catch(err=>{res.json(err)}) 
    }
}

module.exports = controller;