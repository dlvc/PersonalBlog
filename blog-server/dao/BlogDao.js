const dbutil = require('./DBUtil');

function insertBlog(title, content,views, tags, ctime, utime, callback) {
    const insertSql = "insert into blog (title, content, views, tags, ctime, utime) values (?, ?, ?, ?, ?, ?)";
    const params = [title, content, views, tags, ctime, utime];
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

function queryBlogByPage(page, pageSize, callback) {
    const selectSql = "select * from blog order by id desc limit ?, ?";
    const params = [page, pageSize];
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

function queryBlogCount(callback) {
    const selectSql = 'select count(1) as total from blog';
    const params = [];
    const conn = dbutil.createConnection();
    conn.connect();
    conn.query(selectSql, params, (error, result) => {
        if(error) {
            console.log(error);
        }else {
            callback(result);
        }
    });
}

function queryBlogById(id, callback) {
    const selectSql = 'select *  from blog where id = ?';
    const params = [id];
    const conn = dbutil.createConnection();
    conn.connect();
    conn.query(selectSql, params, (error, result) => {
        if(error) {
            console.log(error);
        }else {
            callback(result);
        }
    });
}

function queryAllBlog(callback) {
    const selectSql = 'select *  from blog order by id desc';
    const params = [];
    const conn = dbutil.createConnection();
    conn.connect();
    conn.query(selectSql, params, (error, result) => {
        if(error) {
            console.log(error);
        }else {
            callback(result);
        }
    });
}

function addViews(id, callback) {
    const selectSql = 'update blog set views = views + 1 where id = ?';
    const params = [id];
    const conn = dbutil.createConnection();
    conn.connect();
    conn.query(selectSql, params, (error, result) => {
        if(error) {
            console.log(error);
        }else {
            callback(result);
        }
    });
}

function queryHotBlog(size, callback) {
    const selectSql = 'select * from blog order by views desc limit ?';
    const params = [size];
    const conn = dbutil.createConnection();
    conn.connect();
    conn.query(selectSql, params, (error, result) => {
        if(error) {
            console.log(error);
        }else {
            callback(result);
        }
    });
}

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;