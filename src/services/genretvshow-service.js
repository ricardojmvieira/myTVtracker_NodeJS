const db = require('../configs/mongodb.js').getDB();
const ObjectId = require('mongodb').ObjectID;

exports.getGenreTvshows = () => {
    return new Promise((resolve, reject) => {
        db
            .collection('genres')
            .find()
            .project({ nameGenre: 1 })
            .toArray()
            .then((genres) => resolve(genres))
            .catch(err => reject(err));
    });
};
exports.insertGenreTvshow = (body) => {
    return new Promise((resolve, reject) => {
        db
            .collection('genres')
            .insertOne({
                nameGenre: body.nameGenre,
            })
            .then(res => resolve({ inserted: 1, _id: res.insertedId }))
            .catch(err => reject(err));
    });
};
exports.removeGenreTvshow = (genreId) => {
    return new Promise((resolve, reject) => {
        db
            .collection('genres')
            .deleteOne({ _id: ObjectId(genreId) })
            .then(() => resolve({ removed: 1 }))
            .catch(err => reject(err));
    });
};