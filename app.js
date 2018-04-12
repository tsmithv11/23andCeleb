var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    fs          = require("fs"),
    multer      = require("multer"),
    PythonShell = require("python-shell"),
    upload      = multer({ dest: 'public/tempPics/' });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));



app.get("/", function(req, res){
    res.render("index");
});


app.post('/upload', upload.single('file'), function(req, res) {
    var file = __dirname + '/public/tempPics/' + req.file.filename +".jpg";
    
    fs.rename(req.file.path, file, function(err) {
        if (err) {
            console.log(err);
            res.send(500);
        } else {
            res.redirect("/displayImage/"+req.file.filename);
        }
    });
});


app.get("/displayImage/:id", function(req,res){
    res.render("displayImage",{picpath: req.params.id});
});


app.get("/result/:id", callPython);

function callPython(req, res) {
  var options = {
    args:
    [
      "Test String"
    ]
  };
  PythonShell.run("./python/test.py", options, function (err, data) {
    if (err){
        res.send(err);
    }
    console.log(data);
    res.send(data.toString());
  });
}



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The 23andCeleb Server Has Started!");
});