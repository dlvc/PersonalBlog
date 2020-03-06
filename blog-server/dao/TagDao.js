const dbutil = require('./DBUtil');

function insertTag(tag, ctime, utime, callback) {
    const insertSql = "insert into tags (tag, ctime, utime) values ( ?, ?, ?)";
    const params = [tag, ctime, utime];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (error, result) => {
        if(error) {
            console.log(error);
        }else {
            callback(result);
        }
    });
    connection.end();
}

function queryTag(tag, callback) {
    const selectSql = "select * from tags where tag = ?";
    const params = [tag];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(selectSql, params, (error, result) => {
        if(error) {
            console.log(error);
        }else {
            callback(result);
        }
    });
    connection.end();
}

function queryAllTag(callback) {
    const selectSql = "select * from tags";
    const params = [];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(selectSql, params, (error, result) => {
        if(error) {
            console.log(error);
        }else {
            callback(result);
        }
    });
    connection.end();
}

function queryByTag(tag, callback) {
    const selectSql = "select * from tags where tag = ?";
    const params = [tag];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(selectSql, params, (error, result) => {
        if(error) {
            console.log(error);
        }else {
            callback(result);
        }
    });
    connection.end();
}

module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;
module.exports.queryByTag = queryByTag;
