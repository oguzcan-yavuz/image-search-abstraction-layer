const rp = require('request-promise');
const dbController = require('./dbController.js');
const CSE_ID = process.env.CSE_ID;
const API_KEY = process.env.API_KEY;

function parseResults(results) {
    // url, snippet, thumbnail, parent
    results = results["items"];
    let parsedResults = [];
    results.map((result) => {
        let parsedResult = {
            url: result.link,
            snippet: result.snippet,
            thumbnail: result.image.thumbnailLink,
            context: result.image.contextLink
        };
        parsedResults.push(parsedResult);
    })
    return Promise.resolve(parsedResults);
}

function getSearchResults(query, offset) {
    let options = {
        uri: "https://www.googleapis.com/customsearch/v1",
        qs: {
            q: query,
            cx: CSE_ID,
            start: offset,
            searchType: "image",
            key: API_KEY
        },
        json: true
    };
    return rp(options).then(results => {
        let parsedResults = parseResults(results);
        return Promise.resolve(parsedResults);
    })
}

module.exports = function(query, offset) {
    dbController.insertSearchQuery(query, (err, data) => {
        if(err) throw err;
        console.log("insert:", data);
    });
    return new Promise((resolve, reject) => {
        return resolve(getSearchResults(query, offset));
    });
}
