var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


// //connecting DB//app config
mongoose.connect("mongodb://localhost:27017/config", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//create collection
let giangvienSchema = mongoose.Schema({
  Hoten: {
    type: String
  },
  DiaChi: {
    type: String
  },
  sdt: {
    type: String
  },
  MaGV: {
    type: String
  }
});
let giangvien = mongoose.model("giangvien", giangvienSchema);


/* GET home page. */
router.get('/', function (req, res, next) {
  giangvien.find({}, (error, data) => {
    res.render("index", { giangviens: data });
  });

});
//form add
router.get('/form-add', function (req, res, next) {
  res.render('form-add', {});
});
router.post('/add', function (req, res, next) {
  giangvien.create(req.body);
  res.redirect('/');
});
router.get('/form-update/:id', function (req, res, next) {
  giangvien.findById(req.params.id, (error,data)=> {
    res.render('form-update',{giangvien:data});
  });
});
router.post('/update', function(req, res, next){
  
  giangvien.findByIdAndUpdate(req.body.id, req.body, (error, data)=>{
    res.redirect('/');
  });
});
router.get('/form-delete/:id', function (req, res, next) {
  giangvien.findByIdAndDelete(req.params.id, (error,data)=> {
    res.redirect('/');
  });
});

module.exports = router;
