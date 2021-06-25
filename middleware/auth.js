const User = require('../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    
    if(!token) return res.status(400).json({msg: 'Not Authorize to access this route!'});
    
    const isCustomAuth = token.length < 500;
    
    try{
        if(isCustomAuth){
            const decoded = await jwt.verify(token, config.get('secret'));
    
            const user = await User.findById(decoded.id);
    
            if(!user) return res.status(404).json({msg: 'No user found!'});
            req.userId = decoded.id;
        }else{
            const decoded = await jwt.decode(token);

            req.userId = decoded.sub;
        }
        next();
    }catch(err){
        return res.status(401).json({msg: 'Not Authorize to access this route', id: 'AUTHENTICATION_FAIL'});
    }
}


module.exports = auth;