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

router.post('/add_puzzle',upload.single('image'), PuzzleController.AddPuzzle);

router.get('/show_puzzle', PuzzleController.ShowPuzzle);

router.patch('/update_puzzle',upload.single('image'), PuzzleController.UpdatePuzzle);

router.delete('/delete_puzzle', PuzzleController.DeletePuzzle);



module.exports = router;

