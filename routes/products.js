const express = require('express');

const { check } = require('express-validator')
const router = express.Router();

const productsController = require('../controllers/products');

// /admin/add-product => GET
router.get('/', productsController.getSearchProduct_Shop);

// router.get('/shop', productsController.shopPage);

router.get('/insert', productsController.getAddProduct);

router.get('/search', productsController.getSearchProduct);
router.get('/musicalbum', productsController.getSearchProductByMusicalbum);
router.get('/fashion', productsController.getSearchProductByFashion);
router.get('/photobook', productsController.getSearchProductByPhotobook);
// router.get('/editproduct', productsController.getSearchEditProduct);
// router.get('/update', productsController.update);


router.get('/:product_id', productsController.detailProduct);


// router.get('/insert', productsController.getAddProduct);

router.get('/update/:product_id', productsController.getUpdateProduct);

// /admin/add-product => POST
router.post('/insert', [
    check('image').trim().not().isEmpty().withMessage("image is required"),
    check('product_name').trim().not().isEmpty().withMessage("product name is required"),
    check('details').trim().not().isEmpty().withMessage("detailsis required"),
    check('remaining').isFloat({ gt: 0 }).withMessage("greater than zero"),
    check('price').isFloat({ gt: 0 }).withMessage("price than zero"),
    check('category').trim().not().isEmpty().withMessage("category required"),
], productsController.postAddProduct);

router.post('/update', [
    check('product_id').not().isEmpty().withMessage("empty"),
    check('image').trim().not().isEmpty().withMessage("image is required"),
    check('product_name').trim().not().isEmpty().withMessage("product name is required"),
    check('details').trim().not().isEmpty().withMessage("detailsis required"),
    check('remaining').isFloat({ gt: 0 }).withMessage("greater than zero"),
    check('price').isFloat({ gt: 0 }).withMessage("price than zero"),
    check('category').trim().not().isEmpty().withMessage("category required"),
], productsController.postUpdateProduct);

router.get('/delete/:product_id', productsController.getDeleteProduct);


// router.get('/', productsController.getSearchProduct);

// router.get('/search', productsController.getSearchProduct);

// router.get('/insert', productsController.getAddProduct);

// router.post('/insert', [
//     check('image').trim().not().isEmpty().withMessage("image is required"),
//     check('product_name').trim().not().isEmpty().withMessage("product name is required"),
//     check('details').trim().not().isEmpty().withMessage("detailsis required"),
//     check('remaining').isFloat({ gt: 0 }).withMessage("greater than zero"),
//     check('price').isFloat({ gt: 0 }).withMessage("price than zero"),
//     check('category').trim().not().isEmpty().withMessage("category required"),
// ], productsController.postAddProduct);

// router.post('/update', [
//     check('product_id').not().isEmpty().withMessage("empty"),
//     check('image').trim().not().isEmpty().withMessage("image is required"),
//     check('product_name').trim().not().isEmpty().withMessage("product name is required"),
//     check('details').trim().not().isEmpty().withMessage("detailsis required"),
//     check('remaining').isFloat({ gt: 0 }).withMessage("greater than zero"),
//     check('price').isFloat({ gt: 0 }).withMessage("price than zero"),
//     check('category').trim().not().isEmpty().withMessage("category required"),
// ], productsController.postUpdateProduct);

// router.get('/delete/:product_id', productsController.getDeleteProduct);

// router.get('/update/:product_id', productsController.getUpdateProduct);

exports.routes = router;