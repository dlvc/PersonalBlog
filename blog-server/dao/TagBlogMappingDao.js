const dbutil = require('./DBUtil');

function insertTagBlogMapping(tagId, blogId, ctime, utime, callback) {
    const insertSql = "insert into tag_blog_mapping (tag_id, blog_id, ctime, utime) values (?, ?, ?, ?)";
    const params = [tagId, blogId, ctime, utime];
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

function queryByTag(tagId, callback) {
    const querySql = "select * from tag_blog_mapping where tag_id = ?";
    const params = [tagId];
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

module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;