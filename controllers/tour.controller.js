const Tour = require('../models/Tour.model')

module.exports.allTour = async (req, res, next) =>{
    res.status(200).json({
        success: true,
        message: 'Data found successfully',
        data: result
    })
}

module.exports.createTour = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Data insert successfully',
        data: result
    })
}

module.exports.updateTour = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Data update successfully',
        data: result
    })
}

module.exports.detailsTour = async (req, res, next) => {
   res.status(200).json({
        success: true,
        message: 'Data found successfully',
        data: result
    })
}

module.exports.deleteTour = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Data deleted successfully',
        data: result
    })
}

