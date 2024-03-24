var express = require('express');
var router = express.Router();
const PuzzleController = require('../controller/Puzzle')
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/Puzzle')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

/* GET puzzle listing. */

router.get('/', PuzzleController.ShowPuzzle);

router.post('/',upload.single('image'), PuzzleController.AddPuzzle);

router.patch('/',upload.single('image'), PuzzleController.UpdatePuzzle);

router.delete('/', PuzzleController.DeletePuzzle);



module.exports = router;

