const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PuzzleSchema = new Schema({
 image : String,
 answer : String,
 category : {
    type : Schema.Types.ObjectId,
    ref : 'category'
 }
});

module.exports = mongoose.model('puzzle', PuzzleSchema);