const express = require('express');
const app = express();
const multer = require('multer');

app.use(express.static('./src'));
app.use(express.urlencoded({extended: false}))
app.use(express.json());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './files');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    } 
});

const file = multer({storage});


app.post('/upload', file.array('file', 2), (req, res) => {
    res.json({  file: req.files, 
                body: req.body });
});

const port = process.env.port || 8000;

app.listen(port, () => {
    console.log('server started at port ', port)
})
