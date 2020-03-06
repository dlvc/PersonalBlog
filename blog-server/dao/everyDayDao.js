const dbutil = require('./DBUtil');

function insertEveryDay(content, ctime, callback) {
    const insertSql = "insert into every_day (content, ctime) values (?, ?)";
    const params = [content, ctime];
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

function queryEveryDay(callback) {
    const querySql = "select * from every_day order by id desc limit 1";
    const params = [];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if(error) {
            console.log(error);
        }else {
            callback(result);
        }
    });
    connection.end();
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;