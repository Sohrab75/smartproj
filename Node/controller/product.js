const product = require('../models/products.json');

exports.getProductList = (req, res)=>{
    const result = product.map(item=>item.name);
    res.status(200).json({
        message: "product loaded successfully",
        product: result
    })
}