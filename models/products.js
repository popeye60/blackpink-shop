const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Products {
    constructor(image, product_name, details, remaining, price, category, id) {
        this.image = image;
        this.product_name = product_name;
        this.details = details;
        this.remaining = remaining;
        this.price = price;
        this.category = category;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db
                .collection('products')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            // Insert product
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    static fetchAll() {
        const db = getDb();
        return db
            .collection('products')
            .find()
            .toArray()
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }
    static fetchAllByMusicalbum() {
        const db = getDb();
        return db
            .collection('products')
            .find({category:"Music album"})
            .toArray()
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }
    static fetchAllByFashion() {
        const db = getDb();
        return db
            .collection('products')
            .find({category:"Fashion"})
            .toArray()
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAllByPhotobook() {
        const db = getDb();
        return db
            .collection('products')
            .find({category:"Photobook"})
            .toArray()
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static getSearchProductByPhotobook() {
        const db = getDb();
        return db
            .collection('products')
            .find({category:"Photobook"})
            .toArray()
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => {w
                console.log(err);
            });
    }
    static findById(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(product => {
                // console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findByName(prodName) {
        const db = getDb();
        return db
          .collection("products")
          .find({ product_name: prodName })
          .next()
          .then((product) => {
            console.log(product);
            return product;
          })
          .catch((err) => {
            console.log(err);
          });
    }
}


module.exports = Products;