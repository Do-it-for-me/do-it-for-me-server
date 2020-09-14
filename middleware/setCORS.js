module.exports = (req, res, next) => {
  // Add a header to the response
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type", // Headers that the browser JS runtime can send
  });
  next();
};
