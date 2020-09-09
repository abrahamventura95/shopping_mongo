const jwt = require('jsonwebtoken');

exports.ensureAuthenticated = function(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

exports.isShop = function(req, res, next){
	if(req.user.type != 'shop') return res.sendStatus(403);
    next();			    
}

exports.isAdmin = function(req, res, next){
    if(req.user.type != 'admin') return res.sendStatus(403);
    next();                
}