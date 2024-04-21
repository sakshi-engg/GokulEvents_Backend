const express = require("express");
const { getAllproducts, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const router = express.Router();

router.route("/products")
    .get(getAllproducts);

router.route("/product/new")
    .post(createProduct);

router.route("/product/:id")
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;
