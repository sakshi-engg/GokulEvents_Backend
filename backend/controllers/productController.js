const Product = require("../models/productModel");

// Create product API -- only Admin can Access this Field [API]
exports.createProduct = async (req, res, next) => {
    
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
     
        })
    }

//Get all products API
exports.getAllproducts = async(req,res) => {
    const products = await Product.find();
    res.status(200).json({
    success : true,
    products
    })
}

//Update product details -- can only be accessed by Admin
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success : false,
            message : "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators : true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
}

//delete product -- Only admin can access
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Product removed"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
