const Product = require("../models/productModel");
const User = require("../models/userModel");
const factory = require(`${__dirname}/factoryFunction`);

exports.getAllProducts = factory.getAll(Product);
exports.getOne = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
exports.getTopProducts = factory.getTop(Product);

exports.getOneSlug = async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }
  res.status(200).json({
    status: "success",
    product: product,
  });
};
