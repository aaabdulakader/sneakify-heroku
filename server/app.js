const express = require("express");
const morgan = require("morgan");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require("./models/productModel");
const compression = require("compression");

const app = express();
const router = express.Router();

// app.use(express.static(path.join(__dirname, "../client/build")));
app.use(compression());

process.env.NODE_ENV === "development" && app.use(morgan("dev"));

// app.use(
//   cors({
//     origin: "http://localhost:3001",
//     // credentials: true,
//     withCredentials: true,
//   })
// );
app.use(cors());

// limit the amount of data that can be sent to the server
app.use(express.json({ limit: "20kb" }));

app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.post("/create-checkout-session", async (req, res, next) => {
  const { items } = req.body;

  const prices = await Product.find({
    _id: {
      $in: items.map((item) => item.product_id),
    },
  }).select("price");

  items.forEach(async (item, i) => {
    item.quantity = item.quantity;

    const price = prices.find((price) => price._id == item.product_id);

    item.price = price.price;
  });

  const line_items = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: [item.image],
      },
      unit_amount: parseInt(item.price * 100),
    },
    quantity: +item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["alipay", "card", "cashapp"],
    line_items,
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },

    success_url: `${req.headers.origin}/checkout:success`,
    cancel_url: `${req.headers.origin}/cart:cancel`,
  });

  res.status(200).json({
    link: session.url,
    items,
    status: session.payment_status === "paid" ? "paid" : "pending",
    total_amount: session.amount_total / 100, // convert to dollars
    user: req.body.user,
    session,
  });
});

app.get("/logout", (req, res, next) => {
  if (!req.jwt) {
    return res.status(200).json({
      status: "success",
      message: "User logged outt",
    });
  }
  res.cookie("jwt", "", {
    expires: 1,
    // httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "User logged out",
  });
});
// Fore non-existing routes or for routes that come with the wrong HTTP method
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
  next();
});

module.exports = app;
