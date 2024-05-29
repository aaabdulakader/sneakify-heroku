const express = require("express");
const { testMiddleware } = require(`${__dirname}/../test/test.js`);
const {
  signUp,
  login,
  secure,
  limit,
} = require("../controllers/Authentication");
const Cart = require("../models/cartModel");

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getCart,
  postCart,
  getAllCarts,
  deleteAll,
  updateCart,
  getAllOrders,
  getUserOrders,
  postOrder,
  AddDeleteFavorite,
  getAllUserOrders,
  getOrder,
  deleteUserCart,
} = require("../controllers/userController");

const router = express.Router();
router
  .route("/")
  .get(secure, limit("admin"), getAllUsers, testMiddleware)
  .post(signUp);
router.route("/cart").get(getAllCarts).delete(deleteAll);
router
  .route("/:id/cart")
  .get(getCart)
  .post(postCart)
  .patch(updateCart)
  .delete(deleteUserCart);
router
  .route("/:id/favorites/:productId")
  .post(AddDeleteFavorite)
  .delete(AddDeleteFavorite);
router.route("/:id/orders").post(postOrder).get(getAllUserOrders);
router.route("/orders").get(getAllOrders);
router.route("/orders/:id").get(getOrder);
// router.route("/orders").get(getAllOrders).post(postOrder);
router.route("/:id").delete(secure, deleteUser).patch(updateUser).get(getUser);

router.route("/signup").post(signUp);
router.route("/login").post(login);

module.exports = router;
