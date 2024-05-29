exports.testMiddleware = (req, res, next) => {
  console.log("Hello from the test middleware");
  next();
};

