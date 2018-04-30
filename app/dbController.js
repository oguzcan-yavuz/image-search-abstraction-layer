const db = require('./db.js');
let dbObj;

// create an instance of the database at start
db.connectDB(err => {
    if(err) throw err;
    dbObj = db.getDBObj();
});

function insertSearchQuery(query) {
    // inserts latest search queries to the database with current date
    return new Promise((resolve, reject) => {
        let doc = {
            term: query,
            when: new Date()
        };
        let searches = dbObj.collection('searches');
        searches.insert(doc, (err, data) => {
            if(err) reject(err);
            resolve();
        })
    });
}

function getLatestQueries() {
    return new Promise((resolve, reject) => {
        let projection = { _id: false };
        let sortBy = { when: -1 };
        let cursor = dbObj.collection('searches').find().project(projection).sort(sortBy);
        cursor.toArray((err, documents) => {
            if(err) reject(err);
            resolve(documents);
        })
    })
}

module.exports = { insertSearchQuery, getLatestQueries };
