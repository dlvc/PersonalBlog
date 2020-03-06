const blog = require('../dao/BlogDao');
const tagDao = require('../dao/TagDao');
const tagBlogMappingDao = require('../dao/TagBlogMappingDao');
const timeUtil = require('../util/TimeUtil');
const respUtil = require('../util/RespUtil');
const url = require('url');
const path = new Map();

function queryHotBlog(request, response) {
    blog.queryHotBlog(5, result => {
        response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}

path.set('/queryHotBlog', queryHotBlog);

function queryAllBlog(request, response) {
    blog.queryAllBlog(result => {
        response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}

path.set('/queryAllBlog', queryAllBlog);

function queryBlogById(req, res) {
    const params = url.parse(req.url, true).query;
    blog.queryBlogById(parseInt(params.bid), result => {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.write(respUtil.writeResult('success', '查询成功', result));
        res.end();
        blog.addViews(parseInt(params.bid), (result) => {});
    });
}

path.set('/queryBlogById', queryBlogById);

function queryBlogCount(request, response) {
    blog.queryBlogCount(result => {
        response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    });
}

path.set('/queryBlogCount', queryBlogCount);

function queryBlogByPage(request, response) {
    const params = url.parse(request.url, true).query;
    blog.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), result => {
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<[^>]*>/g, '');
            result[i].content = result[i].content.substring(0, 300);
        }
        response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    });
}

path.set('/queryBlogByPage', queryBlogByPage);

function editBlog(request, response) {
    const params = url.parse(request.url, true).query;
    request.on('data', data => {
        const tags = params.tags.toString().replace(/ /g, '').replace(/，/g, ',');
        blog.insertBlog(params.title, data.toString(), 0, tags, timeUtil.getNow(), timeUtil.getNow(), result => {
            response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
            const blogId = result.insertId;
            const tagList = tags.split(',');
            for (let i = 0; i < tagList.length; i++) {
                if (tagList[i] == '') {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        });
    });
}

path.set('/editBlog', editBlog);

function queryTag(tag, blogId) {
    tagDao.queryTag(tag, result => {
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        } else {
            insertTagBlogMapping(result[0].id, blogId);
        }
    });
}

function insertTag(tag, blogId) {
    tagDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), result => {
        insertTagBlogMapping(result.insertId, blogId);
    });
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), result => {

    });
}

module.exports.path = path;