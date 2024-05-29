const mongoose = require("mongoose");

//   "name": "Running Shoes",
//   "brand": "Nike",
//   "category": "Sneakers",
//   "price": 99.99,
//   "description": "Comfortable running shoes for all-day wear.",
//   "sizes": ["US 7", "US 8", "US 9"],
//   "colors": ["Black", "White", "Blue"],
//   "imageUrls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
//   "createdAt": ISODate("2022-02-21T12:00:00Z")

const productSchema = new mongoose.Schema({
  title: String,
  subTitle: String,
  brand: String,
  category: {
    type: String,
    enum: ["lifestyle", "Basketball", "Running", "Soccer", "Training"],
  },
  price: Number,
  description: String,
  gender: {
    type: String,
    enum: ["Men", "Women", "Kids", "Unisex"],
  },
  sizes: [String],
  colors: [String],
  discount: {
    type: Number,
    min: 0,
    max: 100,
  },
  //   Embedded ratings and reviews
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      stars: { type: Number, min: 1, max: 5 },
      review: String,
    },
  ],
  // list of ids of other colors available for the product

  otherColors: [String],

  rating: Number,
  images: [String],
  stageImage: String,
  createdAt: { type: Date, default: Date.now },
  slug: String,
  quantity: {
    type: Number,

    validate: {
      validator: function (val) {
        return val > 0;
      },
      message: "Quantity must be greater than 0",
    },
  },
});

productSchema.pre(/^find/, function (next) {
  this.find().select("-__v");
  next();
});

// random number between 1 and 100 for quantity of products in stock that's generated randomly before saving if not provided

productSchema.pre("save", function (next) {
  if (!this.quantity) {
    this.quantity = Math.floor(Math.random() * 100) + 1;
  }

  // subTitle includes Kids
  // if (this.subTitle.includes("Kids")) {
  //   this.sizes = [
  //     "3.5Y",
  //     "4Y",
  //     "4.5Y",
  //     "5Y",
  //     "5.5Y",
  //     "6Y",
  //     "6.5Y",
  //     "7Y",
  //     "7.5Y",
  //     "8Y",
  //     "8.5Y",
  //     "9Y",
  //     "9.5Y",
  //     "10Y",
  //     "10.5Y",
  //     "11Y",
  //     "11.5Y",
  //     "12Y",
  //     "12.5Y",
  //     "13Y",
  //     "13.5Y",
  //     "1Y",
  //     "1.5Y",
  //     "2Y",
  //     "2.5Y",
  //   ];
  // }
  next();
});
productSchema.pre("save", function (next) {
  this.stageImage = this.images[0];
  next();
});

// generate slug before saving
productSchema.pre("save", function (next) {
  // delete ending and start spaces
  this.slug = `${this.category}-${this.title.trim().replace(/ /g, "-")}`;
  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "otherColors",
    select: "title price stageImage",
  });
  next();
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
