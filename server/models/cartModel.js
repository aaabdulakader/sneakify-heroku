const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      product: {
        type: String,
        // ref: "Product",
        // required: true,
      },

      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        // default: 1,
      },
      size: {
        type: String,
        required: true,
      },

      color: {
        type: String,
      },

      price: {
        type: Number,
        required: true,
      },

      image: {
        type: String,
      },

      createdAt: {
        type: Date,
        default: Date.now(),
      },

      updatedAt: {
        type: Date,
        default: Date.now(),
      },

      slug: {
        type: String,
        // required: true,
      },

      // slug: {
      //   type: String,
      //   validate: this.validate({
      //     validator: function (v) {
      //       return v === this.title.toLowerCase().split(" ").join("-");
      //     },
      //     message: "Slug must be the same as the title",
      //   }),
      // },
    },
  ],

  // items.length
  totalQuantity: {
    type: Number,
    // default: 0,

    get: function () {
      return this.items.length;
    },
  },
});

// example post request
// {
//   "user": "615f1b3b1f9c1f3b6c7c4d4d",
//   "items": [
//     {
//       "product": "615f1b3b1f9c1f3b6c7c4d4d",
//       "quantity": 2,
//       "size": 5,
//       "color": "red",
//       "price": 200,
//     }
//   ]
// }

cartSchema.pre(/^find/, function (next) {
  this.find().select("-__v");
  next();
});

// populate user and products
cartSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: "user",
  //   select: "_id",
  // }).populate({
  //   path: "products.product",
  //   select: "title",
  // });
  next();
});

// totalQuantity
// cartSchema.virtual("totalQuantity").get(function () {
//   return this.items.reduce((acc, item) => {
//     return acc + item.quantity;
//   }, 0);
// });

// set totalQuantity to the total quantity of items array in the cart before and find and update after save

// cartSchema.pre("save", function (next) {
//   this.totalQuantity = this.items.reduce((acc, item) => {
//     return acc + item.quantity;
//   }, 0);
//   next();
// });
// cartSchema.pre(/^find/, function (next) {
//   this.totalQuantity = this.items.reduce((acc, item) => {
//     return acc + item.quantity;
//   }, 0);
//   next();
// });

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
