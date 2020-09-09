const mongoose = require('mongoose');
const createError = require('http-errors');

const User = require('../models/User');
const { check } = require('../lib/encryption');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User
            .find()
            // .select('-password');
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
}

exports.addUser = async (req, res, next) => {
    try {
        // const newUser = new User(req.body);
        const newUser = new User({ ...req.body, role: 'user' });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {
        next(err);
    }
    
}

exports.getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) throw new createError.NotFound();
        const user = await User
            .findById(id)
            // .select('-password');
        if (!user) throw new createError.NotFound();
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) throw new createError.NotFound();
        const updated = await User.findByIdAndUpdate(id, { ...req.body, role: 'user' }, { new: true, runValidators: true });
        if (!updated) throw new createError.NotFound();
        res.status(200).send(updated);
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) throw new createError.NotFound();
        const deleted = await User.findByIdAndRemove(id);
        if (!deleted) throw new createError.NotFound(); 
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Check if user with the given email exists
        const loginUser = await User.findOne({ email });
        // If email doesn't exist, throw an error
        if (!loginUser) throw new createError.Unauthorized();
        const isAuthenticated = await loginUser.authenticate(password);
        // If password doesn't match, throw an error
        if (!isAuthenticated) throw new createError.Unauthorized();
        // Since password match, create a JWT token and save it with the user
        const token = await loginUser.generateAuthToken();
        // Send the token to the client so they can access protected routes
        res.header('X-Auth-Token', token).status(200).send(loginUser);
    } catch(err) {
        next(err);
    }
    
}