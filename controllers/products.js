const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Product = require('../models/products');
const ObjectId = mongodb.ObjectId;

exports.searchPage = (req, res, next) => {
    res.render('products/search', {
        pageTitle: '',
    });
}

exports.updatePage = (req, res, next) => {
    res.render('products/update', {
        pageTitle: '',
    });
}
exports.insert = (req, res, next) => {
    res.render('products/insert', {
        pageTitle: '',
    });
}


exports.getSearchProduct_Shop = (req, res, next) => {
   
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
        .then(products => {
            res.render('products/search', {
                pageTitle: 'Search Product',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getSearchPageProduct = (req, res, next) => {
   
    Product.fetchAll()
        .then(products => { 
            res.render('index', {
                pageTitle: 'Search Product',
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
                pageTitle: 'Search Music album',
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
                pageTitle: 'Search Fashion',
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
                pageTitle: 'Search Photobook',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}



exports.detailProduct = (req, res, next) => {
    console.log(req.params);
    const { product_id } = req.params;
    const image = '';
    const product_name = '';
    const details = '';
    const remaining = '';
    const price = '';
    const category = '';
    Product.findById(product_id)
        .then(product => {
            // console.log(product);
            console.log(product);
            image = product.image;
            product_name = product.product_name;
            details = product.details;
            remaining = product.remaining;
            price = product.price;
            category = product.category;
            res.render('products/detail', {
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
            console.log(category);
        })
        .catch(err => console.log(err));
};

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
            errorMessage: errors.array(),
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
            res.redirect('/shop');
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
            errorMessage: errors.array(),
            product_id: product_id,
            image: image,
            product_name: product_name,
            details: details,
            remaining: remaining,
            price: price,
            category: category
        });
    }

    const product = new Product(image, product_name, details, remaining, price, categor, new ObjectId(product_id));
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


// -----

// exports.postUpdateProduct = (req, res, next) => {
//     console.log(req.body);
//     const { product_id, image, product_name, details, remaining, price, category } = req.body;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.status(200).json({
//             response: {
//                 result: false,
//                 message: errors.array()
//             }
//         });
//     } else {
//         const product = new Product(image, product_name, details, remaining, price, category, new ObjectId(product_id));
//         product
//             .save()
//             .then(result => {
//                 console.log('Update Product');
//                 res.status(200).json({
//                     response: {
//                         result: true,
//                         message: "success"
//                     }
//                 });
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.status(200).json({
//                     response: {
//                         result: false,
//                         message: err
//                     }
//                 });
//             });
//     }
// };

// exports.getDeleteProduct = (req, res, next) => {
//     const { product_id } = req.params;
//     console.log(product_id);
//     Product.deleteById(product_id)
//         .then(() => {
//             console.log('Delete Product');
//             res.status(200).json({
//                 response: {
//                     result: true,
//                     message: "success"
//                 }
//             });
//         })
//         .catch(err => {
//             res.status(200).json({
//                 response: {
//                     result: false,
//                     message: err
//                 }
//             });
//         });
// };

// exports.getUpdateProduct = (req, res, next) => {
//     console.log(req.params);
//     const { product_id } = req.params;
//     let image = '';
//     let product_name = '';
//     let details = '';
//     let remaining = '';
//     let price = '';
//     let category = '';

//     Product.findById(product_id)
//         .then(product => {
//             console.log(product);
//             res.status(200).json({
//                 response: {
//                     data: product,
//                     message: "success"
//                 }
//             });
//         })
//         .catch(err => {
//             res.status(200).json({
//                 response: {
//                     data: [],
//                     message: err
//                 }
//             });
//         });
// };