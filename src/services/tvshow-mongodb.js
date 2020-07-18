const db = require('../configs/mongodb.js').getDB();
const ObjectId = require('mongodb').ObjectID;

exports.getTvshows = (queryString) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (queryString.search) {
            filter.title = { $regex: new RegExp(queryString.search, "i") };
        }
        db
            .collection('tvshows')
            .find(filter)
            .project({ nameTVshow: 1, ranking: 1, genre: 1 })
            .toArray()
            .then((tvshows) => resolve(tvshows))
            .catch(err => reject(err));
    });
};

exports.getTvshow = (id) => {
    return new Promise((resolve, reject) => {
        db
            .collection('tvshows')
            .findOne({ _id: ObjectId(id) })
            .then(tvshow => resolve(tvshow))
            .catch(err => reject(err));
    });
};

exports.insertTvshow = (body) => {
    return new Promise((resolve, reject) => {
        db
            .collection('tvshows')
            .insertOne({
                nameTVshow: body.nameTVshow,
                ranking: body.ranking,
                genre: body.genre,
                description: body.description,
                cover: body.cover
            })
            .then(res => resolve({ inserted: 1, _id: res.insertedId }))//ver
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
                        cover: body.cover,
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