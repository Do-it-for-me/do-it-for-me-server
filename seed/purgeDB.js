const mongoose = require("mongoose");

const User = require("../models/User");
const Record = require("../models/Service");

(async () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/record-shop", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.error(err));
  mongoose.connection.on("open", () => console.log("MongoDB running"));
  mongoose.connection.on("error", (err) => console.error(err));

  try {
    await User.deleteMany({});
    await Record.deleteMany({});
    await Order.deleteMany({});
  } catch (err) {
    console.log(err);
  }

  mongoose.connection.close();
})();
