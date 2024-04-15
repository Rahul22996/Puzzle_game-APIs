const PUZZLE = require('../model/puzzle')
// const fs = require('fs')
// -------------------------------------------------------------------------------------------------------------

exports.ShowPuzzle = async function (req, res, next) {
    try {
        const data = await PUZZLE.find().populate('category')

        res.status(201).json({
            status: "Success",
            message: "All Categories",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// -------------------------------------------------------------------------------------------------------------

exports.AddPuzzle = async function (req, res, next) {
    try {
        req.body.image = req.file.filename

        if (!req.body.answer || !req.body.image || !req.body.category) {
            throw new Error("enter valid fields")
        }

        const data = await PUZZLE.create(req.body)

        res.status(201).json({
            status: "Success",
            message: "Puzzle Added",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// -------------------------------------------------------------------------------------------------------------

exports.UpdatePuzzle = async function (req, res, next) {
    try {

        if (req.file) {
            req.body.image = req.file.filename
        }

        const data = await PUZZLE.findByIdAndUpdate(req.query.id, req.body, { new: true })

        res.status(201).json({
            status: "Success",
            message: "Puzzle Updated",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// -------------------------------------------------------------------------------------------------------------

exports.DeletePuzzle = async function (req, res, next) {
    try {
        const data = await PUZZLE.findByIdAndDelete(req.query.id)

        res.status(201).json({
            status: "Success",
            message: "Puzzle Deleted",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}
