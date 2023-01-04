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

    // sorting
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        const result = await Tour.find({}).sort(sortBy);
        return res.send({status: true, data: result})
    }

    // filtering
    if(req.query.fields){
        const fieldsBy = req.query.fields.split(',').join(' ');
        const result = await Tour.find({}).select(fieldsBy);
        return res.send({status: true, data: result})
    }

    // pagination
    if(req.query.page){
        const {page=1, limit=10} = req.query;
        const skip = (page - 1) * parseInt(limit);

        const totalTour = await Tour.countDocuments(filters)
        const totalPage = Math.ceil(totalTour/limit); 

        const result = await Tour.find({}).skip(skip).limit(limit)
        return res.send({status: true, totalTour: totalTour, totalPage: totalPage, data: result})
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
    const result = await Tour.findById({_id: id})

    if(!result.tourCount){
        console.log(result.tourCount)
        await Tour.updateOne({_id: id}, {tourCount: 1})
        
    }else{
        await Tour.updateOne({_id: id}, {tourCount: result.tourCount + 1})
    }

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

module.exports.trendingTour = async (req, res, next) =>{
    try {
        const result = await Tour.find({}).sort({tourCount: -1}).limit(3)

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

module.exports.cheapestTour = async (req, res, next) =>{
    try {
        const result = await Tour.find({}).sort({price: 1}).limit(3)

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