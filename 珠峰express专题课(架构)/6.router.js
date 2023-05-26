const express = require('./express');
const user = require('./routes/user');
const article = require('./routes/article');
const app = express();

// /add

// /user    /add /remove
// /article /add /remove 
app.use('/user', user); // /user/addxxx
app.use('/user', article);

app.get('/',function (req,res) {
    res.end('home')
})
app.listen(3000)