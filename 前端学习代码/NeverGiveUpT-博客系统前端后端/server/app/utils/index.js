const { parseString } = require("xml2js");

module.exports = {
  getUserDataAsync(req) {
    return new Promise((resolve, reject) => {
      let xmlData = "";
      req
        .on("data", (data) => {
          //数据传递时 触发事件注入到回调函数中
          // console.log(data);
          //将 bufer 转换为字符串
          xmlData += data.toString();
        })
        .on("end", () => {
          //数据接收完毕出发close 事件
          resolve(xmlData);
        });
    });
  },
  parserXMLDataAsync(xmlData) {
    return new Promise((resolve, reject) => {
      parseString(xmlData, { trim: true }, function (err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject("parserXMLDataAsync" + err);
        }
      });
    });
  },
  formatData(data) {
    const jsData = data.xml;
    for (let item in jsData) {
      let value = jsData[item];
      //防止不是数组获取非法数据
      if (Array.isArray(value) && value.length) {
        jsData[item] = value[0];
      }
    }
    return jsData;
  },
};
