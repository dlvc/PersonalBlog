const everyDayDao = require('../dao/everyDayDao');
const timeUtil = require('../util/TimeUtil');
const respUtil = require('../util/RespUtil');
const path = new Map();

function editEveryDay(request, response) {
    request.on('data', data => {
        everyDayDao.insertEveryDay(data.toString(), timeUtil.getNow(), result => {
            response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
        });
    });
}

path.set('/editEveryDay', editEveryDay);

function queryEveryDay(request, response) {
    everyDayDao.queryEveryDay(result => {
        response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}

path.set('/queryEveryDay', queryEveryDay);

module.exports.path = path;