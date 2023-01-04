const Tour = require("../models/Tour.model");


module.exports.allTour = async (req, res, next) =>{
    let filters = {...req.query};
        
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match=> `$${match}`);

    filters = JSON.parse(filterString);

    const excludeFields = ['sort', 'page', 'limit'];
    excludeFields.forEach(field=> delete filters[field]);
    
    const result = await Tour.find(filters);
    if(!result){
        return res.status(400).res.send({status: false, error: "Something went wrong"});
    }
    return res.status(200).json({
        success: true,
        message: 'Data found successfully',
        data: result
    })
}

module.exports.createTour = async (req, res, next) => {
    try {
        const newTour = req.body;
        const result = await Tour.create(newTour)

        res.status(200).json({
        success: true,
        message: 'Data insert successfully',
        data: result
    })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data not inserted',
            error: error
        })
    }
}

module.exports.updateTour = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateTour = req.body;

        const result = await Tour.updateOne({_id: id}, updateTour, {runValidators: true})

        res.status(200).json({
        success: true,
        message: 'Data update successfully',
        data: result
    })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data not updated',
            error: error
        })
    }
}

module.exports.detailsTour = async (req, res, next) => {
   try {
    const { id } = req.params;
    const result = await Tour.find({_id: id})

    return res.status(200).json({
        success: true,
        message: 'Data found successfully',
        data: result
    })
   } catch (error) {
    res.status(400).json({
            status: 'fail',
            message: 'Data not found',
            error: error
        })
   }
}

