const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "shipped", "delivered"],
  },
  items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        // required: true,
      },
      subtotal: {
        type: Number,
      },
    },
  ],
  shipping_address: {
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    phone: String,
    isDefault: Boolean,
  },

  payment_method: {
    type: String,
    enum: ["card", "paypal"],
    required: true,
  },
  paymentInfo: {
    cardNumber: String,
    expDate: String,
    cvv: String,
  },
  total_amount: {
    type: Number,
    // required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

// orderSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "user",
//     select: "firstName lastName email",
//   });

//   next();
// });

orderSchema.pre("save", function (next) {
  let total = 0;
  this.items.forEach((item) => {
    item.subtotal = item.price * item.quantity;
    total += item.subtotal;

    this.total_amount = total + total * 0.05;
  });
  next();
});

// populate the product_id field with the product details
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "items.product_id",
    select: "title slug",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
