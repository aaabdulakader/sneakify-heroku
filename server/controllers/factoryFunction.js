const catchAsync = require("./../catchAsync");

const User = require("../models/userModel");
const Product = require("../models/productModel");
const { type } = require("os");

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // print list of all the params in the request
    const params = Object.keys(req.params);
    console.log("/////////////////////////////////////////" + params);
    const document = await Model.findById(req.params.id);
    if (!document) {
      return next(`No ${Model.modelName} found with that ID`);
    }
    res.status(200).json({
      status: "success",
      document,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const documents = await Model.find();

    if (!documents) {
      return next("No documents found");
    }

    res.status(200).json({
      status: "success",
      results: documents.length,
      documents,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const documents = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      documents,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const documents = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!documents) {
      return next(`No ${Model.modelName} found with that ID`);
    }

    res.status(200).json({
      status: "success",
      documents,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(`No ${Model.modelName} found with that ID`);
    }

    res.status(204).json({
      status: "success",
      document: null,
    });
  });

exports.getCart = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.find({ user: req.params.id });

    if (!document) {
      return next(`No ${Model.modelName} found with that ID`);
    }

    if (document.length === 0) {
      return res.status(200).json({
        status: "success",
        user: null,
        cart: null,
      });
    }

    res.status(200).json({
      status: "success",
      user: document[0].user,
      cart: document[0],
    });
  });

exports.postCart = (Model) =>
  catchAsync(async (req, res, next) => {
    const { user, items } = req.body;

    // Check if the user exists
    const userExists = await User.findById(user);

    if (!userExists) {
      return res
        .status(404)
        .json({ status: "error", message: "User does not exist" });
    }

    // Find the user's cart document
    let cart = await Model.findOne({ user });
    // If the user doesn't have a cart yet, create one
    if (!cart) {
      cart = await Model.create({ user, items: [] });
    }

    // Check if the product is already in the user's cart
    const existsInCart = await Model.find({
      user,
      items: {
        $elemMatch: {
          product: items[0].product,
          size: items[0].size,
          color: items[0].color,
        },
      },
    });

    // If the product exists in the cart, update the quantity
    if (existsInCart.length > 0) {
      cart.items.forEach((item) => {
        if (
          item.product === items[0].product &&
          item.size === items[0].size &&
          item.color === items[0].color
        ) {
          item.quantity = +item.quantity + items[0].quantity;
        }
      });
    } else {
      // If the product is not in the cart, add it
      cart.items.push({
        product: items[0].product,
        title: items[0].title,
        quantity: +items[0].quantity,
        size: items[0].size,
        color: items[0].color,
        price: items[0].price,
        image: items[0].image,
        slug: items[0].slug,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        // totalQuantity: items[0].quantity
      });
    }

    // Update the cart document in the database
    cart = await Model.findByIdAndUpdate(
      cart._id,
      cart,
      { totalQuantity: cart.items.length },
      {
        new: true,
        runValidators: true,
      }
    );

    res
      .status(201)
      .json({ status: "success", cart, message: "Item added to cart" });
  });

exports.deleteAll = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.deleteMany();

    res.status(204).json({
      status: "success",
      document: null,
    });
  });

exports.updateCart = (Model) =>
  catchAsync(async (req, res, next) => {
    const { items } = req.body;

    // Find the user's cart document
    let cart = await Model.findOneAndUpdate(
      { user: req.params.id },
      { items },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ status: "success", cart });
  });

// get top products
exports.getTop = (Model) => {
  return catchAsync(async (req, res, next) => {
    const limit = req.params.id * 1;
    const documents = await Model.find().sort({ rating: -1 }).limit(limit);

    res.status(200).json({
      status: "success",
      results: documents.length,
      documents,
    });
  });
};

// orders
exports.createOrder = (Model) =>
  catchAsync(async (req, res, next) => {
    const { user, items, shipping_address, payment_method } = req.body;

    // Check if the user exists
    const userExists = await User.findById({ _id: user });

    if (!userExists) {
      return res
        .status(404)
        .json({ status: "error", message: "User does not exist!" });
    }

    // Create the order
    const order = await Model.create({
      user,
      items,
      shipping_address,
      payment_method,
    });

    res.status(201).json({
      status: "success",
      order,
    });
  });

exports.getAllUserOrders = (Model) => {
  return catchAsync(async (req, res, next) => {
    const orders = await Model.find({ user: req.params.id });

    res.status(200).json({
      status: "success",
      results: orders.length,
      orders,
    });
  });
};

exports.deleteUserCart = (Model) => {
  return catchAsync(async (req, res, next) => {
    // delete the cart document that hast the user's id in the user field
    await Model.deleteOne({ user: req.params.id });

    res.status(204).json({
      status: "success",
      document: null,
    });
  });
};

exports.AddDeleteFavorite = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id, productId } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const userFavorites = user.favorites;

    if (req.method === "DELETE") {
      const favorite = userFavorites.filter((fav) => fav._id == productId);

      if (favorite.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Product not in favorites" });
      }

      const index = userFavorites.indexOf(favorite[0]);

      userFavorites.splice(index, 1);

      user.favorites = userFavorites;
      await user.save({ validateBeforeSave: false });

      return res.status(200).json({
        status: "success",
        user,
      });
    }

    if (req.method === "POST") {
      // add the product to the user's favorites
      const product = await Product.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json({ status: "error", message: "Product not found" });
      }

      // check if the product is already in the user's favorites
      const exists = userFavorites.filter((fav) => fav._id == productId);

      if (exists.length > 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Product already in favorites" });
      }

      user.favorites.push({
        _id: product._id,
        title: product.title,
        price: product.price,
        stageImage: product.stageImage,
        slug: product.slug,
      });

      await user.save({ validateBeforeSave: false });

      return res.status(200).json({
        status: "success",
        user,
      });
    }
  });
