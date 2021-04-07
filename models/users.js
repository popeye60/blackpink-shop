const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Users {
    constructor(users_name, role, id) {
        this.users_name = users_name;
        this.role = role;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db
                .collection('users')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            // Insert product
            dbOp = db.collection('users').insertOne(this);
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
            .collection('users')
            .find()
            .toArray()
            .then(users => {
                console.log(users);
                return users;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .find({ _id: new mongodb.ObjectId(userId) })
            .next()
            .then(users => {
                console.log(users);
                return users;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .deleteOne({ _id: new mongodb.ObjectId(userId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Users;