const dbutil = require('./DBUtil');

function insertComment(blogId, parent, parentName, userName, email, comments, ctime, utime, callback) {
    const insertSql = "insert into comments (blog_id, parent, parent_name, user_name, email, comments, ctime, utime) values (?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [blogId, parent, parentName, userName, email, comments, ctime, utime];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            callback(result);
        }
    });
    connection.end();
}

function queryCommentsByBlogId(blogId, callback) {
    const querySql = "select * from comments where blog_id = ?";
    const params = [blogId];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            callback(result);
        }
    });
    connection.end();
}

function queryCommentsCountByBlogId(blogId, callback) {
    const querySql = "select count(1) as count from comments where blog_id = ?";
    const params = [blogId];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            callback(result);
        }
    });
    connection.end();
}

module.exports.insertComment = insertComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;