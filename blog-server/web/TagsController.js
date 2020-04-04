const tag = require('../dao/TagDao');
const blog = require('../dao/BlogDao');
const timeUtil = require('../util/TimeUtil');
const respUtil = require('../util/RespUtil');
const tagBlogMappingDao = require('../dao/TagBlogMappingDao');
const url = require('url');
const path = new Map();

function queryRandomTags(request, response) {
    tag.queryAllTag(result => {
        result.sort(() => Math.random() > 0.5);
        response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
    })
}

path.set('/queryRandomTags', queryRandomTags);

function queryByTagId(request, response) {
    const params = url.parse(request.url, true).query;
    tagBlogMappingDao.queryByTagId(parseInt(params.tagId), parseInt(params.page), parseInt(params.pageSize), result => {
        let blogList = [];
        for (let i = 0; i < result.length; i++) {
            const blogId = result[i]['blog_id'];
            blog.queryBlogById(blogId, result => {
                result[0].content = result[0].content.replace(/<[^>]*>/g, '');
                result[0].content = result[0].content.substring(0, 300);
                blogList.push(result[0])
            });
        }
        getResult(blogList, result.length, response);
    });
}

function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(_ => {
            getResult(blogList, len, response);
        }, 10);
    } else {
        response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        response.write(respUtil.writeResult('success', '添加成功', blogList));
        response.end();
    }
}

path.set('/queryByTagId', queryByTagId);

function queryByTagIdCount(request, response) {
    const params = url.parse(request.url, true).query;
    tagBlogMappingDao.queryCountByTagId(parseInt(params.tagId), result => {
        response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        response.write(respUtil.writeResult('success', '添加成功', result[0]));
        response.end();
    });
}

path.set('/queryByTagIdCount', queryByTagIdCount);

module.exports.path = path;