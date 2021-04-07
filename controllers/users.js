const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Users = require('../models/users');

const ObjectId = mongodb.ObjectId;

exports.getSearchUser = (req, res, next) => {
    Users.fetchAll()
        .then(users => {
            res.status(200).json({
                response: {
                    data: users,
                    message: "success"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                response: {
                    data: [],
                    message: err
                }
            });
        });
}

exports.postAddUsers = (req, res, next) => {
    console.log(req.body);
    const { users_name, role } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({
            response: {
                result: false,
                message: errors.array()
            }
        });
    } else {
        const user = new Users(users_name, role);
        user.save().then(result => {
                // console.log(result);
                console.log('Created Users');
                res.status(200).json({
                    response: {
                        result: true,
                        message: "success"
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    response: {
                        result: false,
                        message: err
                    }
                });
            });
    }
};