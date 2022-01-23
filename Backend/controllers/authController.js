const User = require('../models/user');
const jwt = require('jsonwebtoken');

const HandleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    // incorrect email / password
    if(err.message === 'Invalid email address') {
        errors.email = 'Invalid email address';
    }
    if(err.message === 'Incorrect password') {
        errors.password = 'Incorrect password';
    }

    // duplicate email validation
    if (err.code === 11000) {
        errors.email = 'This email already exists';
        return errors;
    }

    // error validation
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge = 3*24*60*60;
const createToken = (id) => {
    return jwt.sign({id}, 'Athena designed by Ayushman Choudhary', {
        expiresIn: maxAge
    })
    
}

const register_get= (req, res) => {
    res.render('register');
}

const register_post= async (req, res) => {
    const {fullname, email, password}= req.body;
    
    try {
        const user = await User.create({fullname, email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});
        res.status(201).json({user: user._id});
    } catch (err) {
        const errors = HandleErrors(err);
        res.status(400).json({ errors });
    }
}

const login_get= (req, res) => {
    res.render('login');
}

const login_post= async (req, res) => {
    const {email, password}= req.body;
    
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors= HandleErrors(err);
        res.status(400).json({ errors });
    }
}

const logout_get = (req,res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}

module.exports= {
    register_get,
    register_post,
    login_get,
    login_post,
    logout_get
}