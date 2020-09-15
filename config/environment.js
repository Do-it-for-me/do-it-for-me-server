//mongodb+srv://LuayMallak:Dhl,ky,htjpgdpshfd@cluster0.2iibv.mongodb.net/record-shop?retryWrites=true&w=majority

//mongodb://127.0.0.1:27017/record-shop

//If we run on production, then we will get NODE_ENV=production

const sharedConfig = {
  // WIll be production when running on remote Express server, because NODE_ENV will be defined then
  env: process.env.NODE_ENV || "development",
  jwt_secret: "JAYzLlDAG3MMe3npgUSk9Yj0g91p5b9UAOc6kUOEN4a13aBGW21QeSMladRav3T",
};

const devConfig = {
  db: "mongodb://127.0.0.1:27017/do-it-for-me",
};

const prodConfig = {
  db:
    "mongodb+srv://LuayMallak:Dhl,ky,htjpgdpshfd@cluster0.2iibv.mongodb.net/record-shop?retryWrites=true&w=majority",
};

//Export everything as one config object

module.exports = Object.assign(
  {},
  sharedConfig,
  sharedConfig.env === "production" ? prodConfig : devConfig
);
