const express = require('express');
const app = express();

const multer = require('multer')
const upload = multer({ dest: 'uploads/' });
app.use(express.static(__dirname))
// input type="text" name="avatar"
app.post('/upload',upload.single('avatar'),function (req,res,next) {
    res.send(req.file);
})

app.listen(3000);