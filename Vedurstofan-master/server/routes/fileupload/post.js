var express = require('express');
var router = express.Router();
/* Defingin multer for uploads */
var multer  = require('multer');
/* Helper for mime type check in filter .. to allow jpg and so on */
var imageType = require('image-type');

var storagePhoto = multer.diskStorage({
	destination: function (req, file, cb) {
    if(file.fieldname === 'contact') {
      cb(null, './public/image/contacts');  
    } else if (file.fieldname === 'users') {
      cb(null, './public/image/users'); 
    } else if (file.fieldname === 'items') {
      cb(null, './public/image/items'); 
    } else if (file.fieldname === 'stations') {
      cb(null, './public/image/stations'); 
    }
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});

var fileFilter = function(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/tiff") {
      cb(null, true);
    } else {
    	cb(new Error('The file you tried to add is not allowed, jpg/jpeg, png and tiff only allowed.'));
    }
};

var uploadPhoto = multer({ storage: storagePhoto, fileFilter: fileFilter,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
});
/* Helper to tell where to put photos */

/* Helper to tell where to put files , thought to be server side, to keep hidden from 
front end layer ... */
var uploadFile = multer({ dest: 'files/'});


router.post('/api/contactImage', uploadPhoto.single('contact'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.status(204).end();
});

router.post('/api/userImage', uploadPhoto.single('users'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.status(204).end();
});

router.post('/api/itemImage', uploadPhoto.single('items'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.status(204).end();
});

router.post('/api/stationImage', uploadPhoto.single('stations'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.status(204).end();
});

router.post('/api/photos/upload', uploadPhoto.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any

});

var cpUpload = uploadPhoto.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
router.post('/api/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
});

module.exports = router;