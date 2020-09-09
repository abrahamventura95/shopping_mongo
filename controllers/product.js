const error_types   = require('./error_types');
const Product       = require('../Models/product');
const Category      = require('../Models/category');

let controller = {
    create: (req, res, next) => {
        if (req.body.name == undefined){
            throw new error_types.InfoError('Name is required');
        }else{
            let document = new Product({
                shop_id:     req.user.sub,
                name:        req.body.name,
                description: req.body.description || '',
                price:       req.body.price       || 0,
                image:       req.body.image       || ''
            }); 
            document.save().then(data => res.json({data: data})).catch(err => next(err));
        }
    },
    search: (req, res, next) => {
        Product.find({name: {$regex: req.param('name'), $options: 'i'}})
            .sort({name: -1})
            .then(data=>res.json(data));
    },
    getAll: (req, res, next) => {
        Product.find({})
            .sort({name: -1})
            .then(data=>res.json(data));
    },
    getAllByShop: (req, res, next) => {
        Product.find({shop_id: req.param('id')})
            .sort({name: -1})
            .then(data=>res.json(data));
    },
    get: (req, res, next) => {
        Product.find({_id:req.param('id')})
            .then(data=>{res.json(data)})
            .catch(err=>{res.json(err)}) 
    },
    update: (req, res, next) => {
        Product.findOne({_id:req.param('id')})
            .then(data=>{
                data.name        = req.body.name        || data.name;
                data.description = req.body.description || data.description;
                data.image       = req.body.image       || data.image;
                data.price       = req.body.price       || data.price;
                if(req.user.sub == data.shop_id){
                    data.save();
                }
                res.json(data)
            })
            .catch(err=>{res.json(err)}) 
    },
    delete: (req, res, next) => {
        Product.deleteOne({_id:req.param('id')})
             .then(data=>{
                res.json(data)
             })
             .catch(err=>{res.json(err)}) 
    },
    createCtgr: (req, res, next) => {
        if (req.body.name == undefined){
            throw new error_types.InfoError('Name is required');
        }else{
            let document = new Category({
                name:        req.body.name,
                description: req.body.description || '',
                image:       req.body.image       || ''
            }); 
            document.save().then(data => res.json({data: data})).catch(err => next(err));
        }
    },
    getAllCtgr: (req, res, next) => {
        Category.find({})
                .sort({name: -1})
                .then(data=>res.json(data));
    },
    updateCtgr: (req, res, next) => {
        Category.findOne({_id:req.param('id')})
                .then(data=>{
                    data.name        = req.body.name        || data.name;
                    data.description = req.body.description || data.description;
                    data.image       = req.body.image       || data.image;
                    data.save();   
                    res.json(data)
                })
                .catch(err=>{res.json(err)}) 
    },
    deleteCtgr: (req, res, next) => {
        Category.deleteOne({_id:req.param('id')})
             .then(data=>{
                res.json(data)
             })
             .catch(err=>{res.json(err)}) 
    }
}

module.exports = controller;