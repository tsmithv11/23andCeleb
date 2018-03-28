var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    fs         = require("fs"),
    multer     = require("multer"),
    upload     = multer({ dest: '/tmp/' });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));



app.get("/", function(req, res){
    res.render("index");
});


app.post('/upload', upload.single('file'), function(req, res) {
    var file = __dirname + '/tempPics/' + req.file.filename;
    
    fs.rename(req.file.path, file, function(err) {
        if (err) {
            console.log(err);
            res.send(500);
        } else {
            res.json({
                message: 'File uploaded successfully',
                filename: req.file.filename
            });
        }
    });
});



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The 23andCeleb Server Has Started!");
});