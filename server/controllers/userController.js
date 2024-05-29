const factory = require("./factoryFunction");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");

exports.getAllUsers = factory.getAll(User);
// exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.getUser = factory.getOne(User);
exports.getCart = factory.getCart(Cart);
exports.postCart = factory.postCart(Cart);
exports.getAllCarts = factory.getAll(Cart);
exports.deleteAll = factory.deleteAll(Cart);
exports.updateCart = factory.updateCart(Cart);
exports.getAllOrders = factory.getAll(Order);
exports.getAllUserOrders = factory.getAllUserOrders(Order);
exports.postOrder = factory.createOrder(Order);
exports.AddDeleteFavorite = factory.AddDeleteFavorite(User);
exports.getOrder = factory.getOne(Order);
exports.deleteUserCart = factory.deleteUserCart(Cart);

// exports.getUserOrders = factory.getUserOrders(Order);
