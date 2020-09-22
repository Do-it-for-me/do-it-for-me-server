const mongoose = require("mongoose");
const faker = require("faker");

const User = require("../models/User");
const Record = require("../models/Record");
const Order = require("../models/Order");

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

  const fakeUsers = Array(10)
    .fill(null)
    .map(
      (item) =>
        new User({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
        })
    );

  const capitalize = (str) =>
    str
      .split(" ")
      .map((word) =>
        word
          .split("")
          .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
          .join("")
      )
      .join(" ");

  const fakeRecords = Array(10)
    .fill(null)
    .map(
      (item) =>
        new Record({
          title: capitalize(faker.random.words()),
          artist: capitalize(faker.random.word()),
          year: faker.date.past(30).getFullYear(),
          price: faker.finance.amount(9.9, 30, 2),
        })
    );

  const fakeOrders = Array(10)
    .fill(null)
    .map(
      (item) =>
        new Order({
          record: faker.random.uuid(),
          quantity: faker.random.number({ min: 1, max: 9 }),
        })
    );

  try {
    await User.create(fakeUsers);
    await Record.create(fakeRecords);
    // await Order.create(fakeOrders);
  } catch (err) {
    console.log(err);
  }

  mongoose.connection.close();
})();
