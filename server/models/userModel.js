const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const Cart = require("./cartModel");
const { ObjectId } = require("mongodb");

const usersSchem = mongoose.Schema({
  // username: {
  type: String,
  // unique: [true, "username already exists"],
  // required: [true, "username required"],
  // },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: [true, "User already exists"],
  },
  phone: {
    type: String,
    // required: [true, "Phone number required"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    select: false,
    required: [true, "Password Required!"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm Password"],
    validator: {
      validator: function (val) {
        return this.password === val;
      },
      message: "passwords not matching!",
    },
  },
  passwordChangedAt: Date,

  firstName: {
    type: String,
    required: [true, "first name required"],
  },
  lastName: {
    type: String,
    required: true,
  },
  shipping_address: {
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    phone: String,
  },
  shipping_addresses: [
    {
      firstName: String,
      lastName: String,
      email: String,
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
      phone: String,
      isDefault: Boolean,
    },
  ],
  paymentInfo: {
    cardNumber: String,
    expDate: String,
    cvv: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  cart: {
    type: mongoose.Schema.ObjectId,
    ref: "Cart",
  },
  favorites: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      unique: true,
    },
  ],
});

// example:

// "shipping_addresses": [
//   {
//     "name": "John Doe",
//     "street": "123 Main St",
//     "city": "Minneapolis",
//     "state": "MN",
//     "zip": "55401",
//     "country": "USA",
//     "phone": "123-456-7890",
//     "isDefault": true
//   },
// ]

usersSchem.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// set passwordChangedAt
usersSchem.pre("save", function (next) {
  !this.isModified("password") || this.isNew
    ? next()
    : (this.passwordChangedAt = Date.now() - 1000); // 1 second earlier
  next();
});

// when saved_addresses array,is being modified add the new address to the shipping_addresses array

usersSchem.pre(/^find/, function (next) {
  this.populate({
    path: "cart",
    select: "-__v",
  });
  // populate favorites array with the products
  this.populate({
    path: "favorites",
    select: "_id title price stageImage slug",
  });

  next();
});

usersSchem.pre("save", async function (next) {
  // this.shippingInfo.forEach((info) => {
  //   info.name = `${this.firstName} ${this.lastName}`;
  // });

  next();
});

//  if isDefault is true, set all other addresses to false ans the shipping address the one with isDefault true
// usersSchem.pre("save", function (next) {
//   this.shipping_addresses.forEach((address) => {
//     if (address.isDefault) {
//       this.shipping_address = address;
//       this.shipping_addresses.forEach((add) => {
//         add.isDefault = false;
//       });
//     } else {
//       this.shipping_address = this.shipping_addresses[0];
//     }
//   });
//   next();
// });

const User = mongoose.model("User", usersSchem);

module.exports = User;
