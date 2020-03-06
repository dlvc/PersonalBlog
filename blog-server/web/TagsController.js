const tag = require('../dao/TagDao');
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

function queryByTag(request, response) {
    const params = url.parse(request.url, true).query;
    tag.queryByTag(params.tag, result => {
        if(!result) {
            return;
        }
        tagBlogMappingDao.queryByTag(result[0].id, result => {
            console.log(result);
        })
    })
}

path.set('/queryByTag', queryByTag);

module.exports.path = path;