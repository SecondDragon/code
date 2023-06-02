const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.static(path.join(__dirname,'images'),{
    maxage: '2h'
}))
const list = require('./data.json')
app.get('/api/list', (req, res) => {
    let start = Math.floor(Math.random() * (list.length - 20));
    res.json(list.slice(start, start + 20));
});
app.listen(4000,()=>{
    console.log(`static-img:port 4000`)
});