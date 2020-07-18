const db = require('../configs/mongodb.js').getDB();
const ObjectId = require('mongodb').ObjectID;
const tvState = require("../helpers/tvState");

exports.getMyTvshows = (userId) => {
    return new Promise((resolve, reject) => {
        db
            .collection('users')
            .find({ _id: ObjectId(userId) })
            .project({ tvshows: [{ tvshowId: 1, season: 1, episode: 1, state: 1 }] })
            .toArray()
            .then((mytvshows) => resolve(mytvshows))
            .catch(err => reject(err));
    });
};

exports.getMyTvshow = (Idtvshow, userId) => {
    return new Promise((resolve, reject) => {
        db
            .collection('users')
            .findOne({ _id: ObjectId(userId) })
            .then((mytvshow) => (
                mytvshow.tvshows.map((tvshow, index) => {
                    if (tvshow.tvshowId == Idtvshow) {
                        let objeto = mytvshow.tvshows[index];
                        resolve(objeto);
                    }
                })
            ))
            /*, tvshows: { $elemMatch: { tvshowId: tvshowId } } */
            //.then((tvshows) => resolve(tvshows))
            .catch((err) => reject(err));
    });
};

exports.insertMyTvshow = (tvshowId, userId) => {
    return new Promise((resolve, reject) => {
        db.collection("users").updateOne(
            { _id: ObjectId(userId) },
            {
                $push: {
                    tvshows: {
                        tvshowId: tvshowId,
                        season: 1,
                        episode: 1,
                        state: tvState.Starting,
                    }
                }
            })
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
};

exports.updateMyTvshow = (id, body, userId) => {
    return new Promise((resolve, reject) => {
        db
            .collection('users')
            .update(
                { _id: ObjectId(userId) },
                {
                    $set: {
                        "tvshows.$[elem]": {
                            tvshowId: id,
                            season: body.season,
                            episode: body.episode,
                            state: body.state,
                        }
                    }
                }, { arrayFilters: [{ "elem.tvshowId": id }] }
            )
            .then(() => resolve({ updated: 1 }))
            .catch(err => reject(err));
    });
};
exports.removeMyTvshow = (id, userId) => {
    return new Promise((resolve, reject) => {
        db
            .collection('users')
            .update(
                { _id: ObjectId(userId) },
                { $pull: { tvshows: { tvshowId: id } } }
            )
            .then(() => resolve({ removed: 1 }))
            .catch(err => reject(err));
    });
};