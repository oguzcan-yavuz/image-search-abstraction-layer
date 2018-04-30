const db = require('./db.js');
let dbObj;

// create an instance of the database at start
db.connectDB(err => {
    if(err) throw err;
    dbObj = db.getDBObj();
})

function insertSearchQuery(query, callback) {
    // inserts latest search queries to the database with current date
    let doc = {
        term: query,
        when: new Date()
    }
    let searches = dbObj.collection('searches');
    searches.insert(doc, (err, data) => {
        callback(err, data);
    })
}

module.exports = { insertSearchQuery };
