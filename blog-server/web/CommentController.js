const comment = require('../dao/CommentDao');
const timeUtil = require('../util/TimeUtil');
const respUtil = require('../util/RespUtil');
const captcha = require('svg-captcha')
const url = require('url');
const path = new Map();

function addComment(request, response) {
    const params = url.parse(request.url, true).query;
    comment.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), result => {
        response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        response.write(respUtil.writeResult('success', '评论成功', null));
        response.end();
    });
}

path.set('/addComment', addComment);

function queryRandomCode(request, response) {
    const img = captcha.create({ fontSize: 50, width: 100, height: 34 });
    response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
    response.write(respUtil.writeResult('success', '获取验证码成功', img));
    response.end();
}

path.set('/queryRandomCode', queryRandomCode);

function queryCommentsByBlogId(request, response) {
    const params = url.parse(request.url, true).query;
    comment.queryCommentsByBlogId(parseInt(params.bid), result => {
        response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
        response.write(respUtil.writeResult('success', '获取评论成功', result));
        response.end();
    })
}

path.set('/queryCommentsByBlogId', queryCommentsByBlogId);

function queryCommentsCountByBlogId(request, response) {
    const params = url.parse(request.url, true).query;
    comment.queryCommentsCountByBlogId(parseInt(params.bid), result => {
        response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
        response.write(respUtil.writeResult('success', '获取评论成功', result));
        response.end();
    });
}

path.set('/queryCommentsCountByBlogId', queryCommentsCountByBlogId);

module.exports.path = path;