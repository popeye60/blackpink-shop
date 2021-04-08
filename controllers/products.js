const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Product = require('../models/products');
const ObjectId = mongodb.ObjectId;

exports.getSearchProductShop = (req, res, next) => {
   
    Product.fetchAll()
        .then(products => { 
            res.render('index', {
                pageTitle: 'Search phone',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getSearchProduct = (req, res, next) => {

    Product.fetchAll()
        .then(Shop => {
            res.render('products/search', {
                pageTitle: 'Search Product',
                prods: Shop,
            });
        })
        .catch(err => {
            console.log(err);
        });
}
exports.getAddProduct = (req, res, next) => {
    const image = '';
    const product_name = '';
    const details = '';
    const remaining = '';
    const price = '';
    const category = '';
    res.render('products/insert', {
        pageTitle: 'Insert Product',
        errorMessage: null,
        product_id: product_id,
        image: image,
        product_name: product_name,
        details: details,
        remaining: remaining,
        price: price,
        category: category
    });
};
exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const { image, product_name, details, remaining, price, category} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('products/insert', {
            pageTitle: 'Insert Product',
            errorMessage: null,
            product_id: product_id,
            image: image,
            product_name: product_name,
            details: details,
            remaining: remaining,
            price: price,
            category: category
        });
    }
    const product = new Product(image, product_name, details, remaining, price, category);
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('/products');
        })
        .catch(err => {
            console.log(err);
        });

};
exports.getUpdateProduct = (req, res, next) => {
    console.log(req.params);
    const { product_id } = req.params;
    let image = '';
    let product_name = '';
    let details = '';
    let remaining = '';
    let price = '';
    let category = '';

    Product.findById(product_id)
        .then(product => {
            console.log(product);
            image = product.image;
            product_name = product.product_name;
            details = product.details;
            remaining = product.remaining;
            price = product.price;
            category = product.category;
            res.render('products/update', {
                pageTitle: 'Update Product',
                errorMessage: null,
                product_id: product_id,
                image: image,
                product_name: product_name,
                details: details,
                remaining: remaining,
                price: price,
                category: category
            });
        })
        .catch(err => console.log(err));
};
exports.postUpdateProduct = (req, res, next) => {
    console.log(req.body);
    const { product_id, image, product_name, details, remaining, price, category } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('products/update', {
            pageTitle: 'Update Product',
            errorMessage: null,
            product_id: product_id,
            image: image,
            product_name: product_name,
            details: details,
            remaining: remaining,
            price: price,
            category: category
        });
    }

    const product = new Product(image, product_name, details, remaining, price, category, new ObjectId(product_id));
    product
        .save()
        .then(result => {
            console.log('Update Product');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
};
exports.getDeleteProduct = (req, res, next) => {
    const { product_id } = req.params;
    console.log(product_id);
    Product.deleteById(product_id)
        .then(() => {
            console.log('Delete Product');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
};