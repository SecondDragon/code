const express = require('./express');


const app = express(); // 发布订阅
app.param('id',function (req,res,next,value,key) {
    req.params.id = value + 10;
    console.log(req.params.id, value)
    next();
})
app.param('id', function (req, res, next, value, key) {
    req.params.id = value -5;
    console.log(req.params.id, value)
    next();
})
app.param('name', function (req, res, next, value, key) {
    req.params.name = value+'px'
    next();
})
app.get('/zf/:id/:name',function (req,res,next) {
    res.end(JSON.stringify(req.params));
})
app.get('/',function (req,res,next) { // layer.keys
    res.end('ok')
});

app.listen(3000);