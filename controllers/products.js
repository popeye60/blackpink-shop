const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Product = require('../models/products');
const Cart = require("../models/carts");
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
exports.getSearchProductByMusicalbum = (req, res, next) => {

    Product.fetchAllByMusicalbum()
        .then(products => {
            res.render('products/musicalbum', {
                pageTitle: 'Search musicalbum',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getSearchProductByFashion = (req, res, next) => {

    Product.fetchAllByFashion()
        .then(products => { 
            res.render('products/fashion', {
                pageTitle: 'Search fashion',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}
exports.getSearchProductByPhotobook = (req, res, next) => {

    Product.fetchAllByPhotobook()
        .then(products => {
            res.render('products/photobook', {
                pageTitle: 'Search photobook',
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
    const product_id = '';
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
    const { image, product_name, product_id, details, remaining, price, category} = req.body;
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
            res.redirect('/products/search');
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
            res.redirect('/search');
        })
        .catch(err => console.log(err));
};
exports.getDeleteProduct = (req, res, next) => {
    const { product_id } = req.params;
    console.log(product_id);
    Product.deleteById(product_id)
        .then(() => {
            console.log('Delete Product');
            res.redirect('/search');
        })
        .catch(err => console.log(err));
};

exports.showCart = (req, res, next) => {
    Cart.fetchAll()
      .then((carts) => {
        res.render("products/shoppingCart", {
          pageTitle: "Cart",
          product_cart: carts,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  exports.addToCart = (req, res, next) => {
    const { add_to_cart } = req.body;
    const quantity = 1
    Product.findByName(add_to_cart).then((product) => {
      product_name = product.product_name;
      price = parseInt(product.price);
      image = product.image;
      const cart = new Cart(product_name, price, quantity, image);
      cart
        .save()
        .then((result) => {
          res.redirect("products/shoppingCart");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  