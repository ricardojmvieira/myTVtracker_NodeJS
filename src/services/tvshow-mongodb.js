const db = require('../configs/mongodb.js').getDB();
const ObjectId = require('mongodb').ObjectID;

exports.getTvshows = () => {
    return new Promise((resolve, reject) => {
        db
            .collection('tvshows')
            .find()
            .project({ 'nameTVshow': 1, 'ranking': 1, 'genre': 1 })
            .toArray()
            .then(tvshows => resolve(tvshows))
            .catch(err => reject(err));
    });
};
exports.getTvshow = id => {
    return new Promise((resolve, reject) => {
        db
            .collection('tvshows')
            .findOne({ _id: ObjectId(id) })
            .then(tvshow => resolve(tvshow))
            .catch(err => reject(err));
    });
};
exports.insertTvshow = body => {
    return new Promise((resolve, reject) => {
        db
            .collection('tvshows')
            .insertOne({ nameTVshow: body.nameTVshow, ranking: body.ranking, genre: body.genre, description: body.description })
            .then(res => resolve({ _id: res.insertedId, inserted: res.result.n }))
            .catch(err => reject(err));
    });
};
exports.updateTvshow = (id, body) => {
    return new Promise((resolve, reject) => {
        db
            .collection('tvshows')
            .updateOne(
                { _id: ObjectId(id) },
                {
                    $set: {
                        nameTVshow: body.nameTVshow,
                        ranking: body.ranking,
                        genre: body.genre,
                        description: body.description,
                    },
                }
            )
            .then(() => resolve({ updated: 1 }))
            .catch(err => reject(err));
    });
};
exports.removeTvshow = id => {
    return new Promise((resolve, reject) => {
        db
            .collection('tvshows')
            .deleteOne({ _id: ObjectId(id) })
            .then(() => resolve({ removed: 1 }))
            .catch(err => reject(err));
    });
};