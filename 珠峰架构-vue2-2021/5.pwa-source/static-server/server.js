const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname,'images'),{
    maxage: '2h'
}))
app.listen(4000,()=>{
    console.log(`static-img:port 4000`)
});