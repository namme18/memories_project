const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.registerUser = (req, res) => {
    
    const { name, email, password } = req.body;

    if(!name || !email || !password) return res.status(400).json({msg: 'Please Enter all fields'})

    const newUser = new User({
        name,
        email,
        password
    })

    User.findOne({email})
        .then(user => {
            if(user) return res.status(404).json({
                msg: 'user already exist!'
            })
            bcrypt.genSalt(10, (err, salt) => {
                if(err) return res.status(400).json({msg:'Cant create salt'});
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) return res.status(400).json({msg:'Cant create hash'});
                    newUser.password = hash;
                    newUser.save().then(user => {
                        jwt.sign(
                            {id: user.id},
                            config.get('secret'),
                            {expiresIn: '1h'},
                            (err, token) => {
                                if(err) if(err) return res.status(400).json({msg:'Cant create token'});
                                return res.status(200).json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                })
                            })
                    })
                    
                })
            })
        })
}

exports.allUser = (req, res) => {
    User.find()
    .select('+password')
        .then(user => {
            res.status(200).json(user);
        })
}

exports.loginUser = (req, res) => {

    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({msg: 'Please Enter All Fields'});

    User.findOne({ email })
        .select('+password')
        .then(user => {
            if(!user) return res.status(404).json({msg: 'User Does not exist'});
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    //if not match
                    if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});

                    //if matched
                    jwt.sign(
                        {id: user.id},
                        config.get('secret'),
                        {expiresIn: '1h'},
                        (err, token) => {
                            if(err) return res.status(400).json({msg: 'Cant create token'});
                            res.status(200).json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })

}