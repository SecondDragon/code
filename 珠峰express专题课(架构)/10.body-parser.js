const express = require('express');
// const bodyparser = require('body-parser');
const app = express();
let bodyparser = {}
bodyparser.urlencoded = function () {
    return (req,res,next)=>{
        console.log(req.headers['content-type'])
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded'){
            let arr = [];
            req.on('data',function (chunk) {
                arr.push(chunk);
            })
            req.on('end',function () {
                req.body = require('querystring').parse(Buffer.concat(arr).toString())
                next();
            })
        }else{
            next();
        }
    }
}
bodyparser.json = function () {
    return (req, res, next) => {
        if(req.headers['content-type'] === 'application/json'){
            let arr = [];
            req.on('data', function (chunk) {
                arr.push(chunk);
            })
            req.on('end', function () {
                req.body = JSON.parse(Buffer.concat(arr).toString())
                next();
            })
        }else{
            next();
        }
    }
}

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.post('/login',function (req,res) {
    res.send(req.body)
})


app.listen(3000);