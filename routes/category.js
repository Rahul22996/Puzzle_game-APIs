var express = require('express');
var router = express.Router();
const CategoryController = require('../controller/Category')
const usersController = require('../controller/User')
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/category')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

/* GET category listing. */

router.get('/', CategoryController.ShowCategory);

router.post('/', upload.single('image'), CategoryController.AddCategory);

router.patch('/', upload.single('image'), CategoryController.UpdateCategory);

router.delete('/', CategoryController.DeleteCategory);

module.exports = router;

