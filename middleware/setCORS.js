module.exports = (req, res, next) => {
  // Add a header to the response
  res.set({
    "Access-Control-Allow-Origin":
      process.env.NODE_ENV === "production"
        ? "https://doitforme.com"
        : "http://localhost:3001",
    Vary: "Origin",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type", // Headers that the browser JS runtime can send
  });
  next();
};
