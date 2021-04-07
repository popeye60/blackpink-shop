const express = require('express');

const { check } = require('express-validator')
const router = express.Router();

const usersController = require('../controllers/users');

// /admin/add-product => GET
router.get('/search', usersController.getSearchUser);

router.post('/insert', [
    check('users_name').trim().not().isEmpty().withMessage("user name is required"),
    check('role').trim().not().isEmpty().withMessage(" role is required"),
], usersController.postAddUsers);

// router.post('/update', [
//     check('product_id').not().isEmpty().withMessage("empty"),
//     check('product_name').trim().isLength({ min: 1 }).withMessage("product name is required"),
//     check('price').isFloat({ gt: 0 }).withMessage("greater than zero")
// ], productsController.postUpdateProduct);

// router.get('/delete/:product_id', productsController.getDeleteProduct);

// router.get('/update/:product_id', productsController.getUpdateProduct);

exports.routes = router;