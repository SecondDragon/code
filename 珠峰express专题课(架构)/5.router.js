// 带参数的路由  /name/:id/:age  => /name/1/2   ={id:1,age:2}

const express = require('./express');

const app = express();

// /zf?a=1&b=2  /zf/1/2
app.get('/zf/:id/:name',function (req,res) {
    console.log(req.params); // id:1,name:2
    res.end(JSON.stringify(req.params))
})

app.listen(3000);

