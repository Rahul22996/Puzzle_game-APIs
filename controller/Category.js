const CTAEGORY = require('../model/category')

// -------------------------------------------------------------------------------------------------------------

exports.ShowCategory = async function (req, res, next) {
    try {
        const data = await CTAEGORY.find()
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

exports.AddCategory = async function (req, res, next) {
    try {
        req.body.image = req.file.filename

        if (!req.body.name || !req.body.image) {
            throw new Error("enter valid fields")
        }

        const data = await CTAEGORY.create(req.body)
        res.status(201).json({
            status: "Success",
            message: "Category Added",
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

exports.UpdateCategory = async function (req, res, next) {
    try {

        if(req.file) {
            req.body.image = req.file.filename
        }

        const data = await CTAEGORY.findByIdAndUpdate(req.query.id, req.body, {new : true})
        res.status(201).json({
            status: "Success",
            message: "Category Updated",
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

exports.DeleteCategory = async function (req, res, next) {
    try {

        const data = await CTAEGORY.findByIdAndDelete(req.query.id)
        res.status(201).json({
            status: "Success",
            message: "Category Deleted",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}
